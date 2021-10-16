import { validateEmailWithRegex } from "shared";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { notAuthenticatedErrorMessage } from "../constants/errorMessages";
import { User } from "../entity/User";
import { DiscordUser } from "../modules/discordUser";
import { GoogleUser } from "../modules/googleUser";
import { NetworkingContext } from "../types/NetworkingContext";
import { getDiscordUserInfo } from "../utils/discordOAuth";
import { getGoogleUserInfo } from "../utils/googleOAuth";
import { loginOAuth } from "../utils/oauthLogin";

@ObjectType()
export class OAuthResponse {
  @Field(() => User, { nullable: true })
  user: User | null;
}

@Resolver()
export class UserResolver {
  @Query(() => User)
  async getProfile(@Ctx() { req }: NetworkingContext) {
    const userId = req.session.userId;

    if (!userId) {
      throw new Error(notAuthenticatedErrorMessage);
    }

    try {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error(notAuthenticatedErrorMessage);
      }
      return user;
    } catch (err) {
      throw new Error(notAuthenticatedErrorMessage);
    }
  }

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

    if (!email || !email.length || !validateEmailWithRegex(email)) {
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

    if (!email || !email.length || !validateEmailWithRegex(email)) {
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
        avatarUrl: userData.avatar || undefined,
        provider: "Google",
        username: userData.username,
      });
    } catch (err) {}

    user = await User.findOne({ where: { email } });

    return loginOAuth(user!, req, res);
  }
}
