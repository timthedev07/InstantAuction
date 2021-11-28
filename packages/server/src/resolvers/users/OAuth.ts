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

@Resolver()
export class OAuthResolver {
  @Mutation(() => OAuthResponse)
  async googleOAuth(
    @Arg("code") code: string,
    @Ctx() { res, req }: NetworkingContext
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
        return loginOAuth(user, req, res);
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

    return loginOAuth(user!, req, res);
  }

  @Mutation(() => OAuthResponse)
  async discordOAuth(
    @Arg("code") code: string,
    @Ctx() { res, req }: NetworkingContext
  ): Promise<OAuthResponse> {
    let userData: DiscordUser;
    let email = "";

    try {
      userData = await getDiscordUserInfo(code);
      if (!userData.email) {
        throw new Error("No Email is linked with this discord account");
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
        return loginOAuth(user, req, res);
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

    return loginOAuth(user!, req, res);
  }
}
