import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { OAuthResponse } from "../../types/OAuthResponse";
import { User } from "../../entity/User";
import { DiscordUser } from "../../modules/discordUser";
import { GoogleUser } from "../../modules/googleUser";
import { NetworkingContext } from "../../types/NetworkingContext";
import { getDiscordUserInfo } from "../../utils/discordOAuth";
import { getGoogleUserInfo } from "../../utils/googleOAuth";
import { loginOAuth } from "../../utils/oauthLogin";
import { getDiscordAvatarUrlFromHash } from "../../utils/getDiscordAvatar";
import { cca, redirectUri } from "../../routes/microsoft";
import { promises } from "fs";
import fetch from "node-fetch";
import { tmpdir } from "os";
import { join } from "path";
import { uploadToImgur } from "../../utils/uploadToImgur";

@Resolver()
export class OAuthResolver {
  @Mutation(() => OAuthResponse)
  async googleOAuth(
    @Arg("code") code: string,
    @Ctx() { req }: NetworkingContext
  ): Promise<OAuthResponse> {
    let userData: GoogleUser;
    let email = "";

    try {
      userData = await getGoogleUserInfo(code);
      email = userData.email;
    } catch (err) {
      return {
        user: null,
      };
    }

    if (!email || !email.length) {
      throw new Error("Invalid email.");
    }

    let user: User | undefined = await User.findOne({ where: { email } });

    if (user) {
      if (user.provider === "Google") {
        return loginOAuth(user, req);
      } else {
        throw new Error("Email already linked with another account.");
      }
    }

    try {
      await User.insert({
        email,
        avatarUrl: userData.picture || undefined,
        provider: "Google",
        username: userData.given_name,
        externalId: String(userData.id),
      });
    } catch (err) {}

    user = await User.findOne({ where: { email } });

    return loginOAuth(user!, req);
  }

  @Mutation(() => OAuthResponse)
  async discordOAuth(
    @Arg("code") code: string,
    @Ctx() { req }: NetworkingContext
  ): Promise<OAuthResponse> {
    let userData: DiscordUser;
    let email = "";

    try {
      userData = await getDiscordUserInfo(code);
      if (!userData.email) {
        throw new Error("No Email is linked with this discord account.");
      }
      if (!userData.verified) {
        throw new Error("Currently not accepting unverified emails.");
      }
      email = userData.email;
    } catch (err) {
      return {
        user: null,
      };
    }

    if (!email || !email.length) {
      throw new Error("Invalid email.");
    }

    let user: User | undefined = await User.findOne({ where: { email } });

    if (user) {
      if (user.provider === "Discord") {
        return loginOAuth(user, req);
      } else {
        throw new Error("Email already linked with another account.");
      }
    }

    try {
      await User.insert({
        email,
        avatarUrl: userData.avatar
          ? getDiscordAvatarUrlFromHash(userData.avatar, userData.id)
          : undefined,
        provider: "Discord",
        username: userData.username,
        externalId: userData.id,
      });
    } catch (err) {}

    user = await User.findOne({ where: { email } });

    return loginOAuth(user!, req);
  }

  @Mutation(() => OAuthResponse)
  async microsoftOAuth(
    @Arg("code") code: string,
    @Ctx() { req }: NetworkingContext
  ): Promise<OAuthResponse> {
    const tokenRequest = {
      code,
      scopes: ["user.read"],
      redirectUri,
    };

    let user: User;

    const ccaResponse = await cca.acquireTokenByCode(tokenRequest);

    const email = ccaResponse.account.username;
    const username = ccaResponse.account.name;
    const externalId = ccaResponse.account.localAccountId;

    user = await User.findOne({ where: { email } });

    // if there's not a user with this email
    if (!user) {
      let msProfilePicResponse;
      try {
        msProfilePicResponse = await fetch(
          "https://graph.microsoft.com/v1.0/me/photo/$value",
          {
            headers: {
              Authorization: "Bearer " + ccaResponse.accessToken,
              "Content-Type": "image/jpg",
            },
          }
        );
      } catch (err) {
        console.log(err);
        return {
          user: undefined,
        };
      }

      const picData = await msProfilePicResponse.buffer();
      let avatarUrl: string;

      if (msProfilePicResponse.ok) {
        // there is a profile image
        const tempdir = tmpdir();
        const imageBufferPath = join(tempdir, "ms-user-profile-pick.jpg");
        await promises.writeFile(imageBufferPath, picData);
        avatarUrl = await uploadToImgur(imageBufferPath);
      } else {
        avatarUrl =
          "https://raw.githubusercontent.com/timthedev07/InstantAuction-ExternalAsset/staging/IA-user.png";
      }
      // sign up
      const insertionResult = await User.insert({
        email,
        username,
        externalId,
        avatarUrl,
        provider: "Microsoft",
      });
      user = await User.findOne(insertionResult.raw[0].id);
    } else {
      // if a registered user is trying to sign in
      if (user.provider === "Microsoft") {
        return loginOAuth(user, req);
      } else {
        throw new Error("Email already linked with another account.");
      }
    }
    return loginOAuth(user, req);
  }
}
