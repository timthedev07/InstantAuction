import { validateEmailWithRegex } from "shared";
import {
  Args,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { notAuthenticatedErrorMessage } from "../constants/errorMessages";
import { User } from "../entity/User";
import { GoogleUser } from "../modules/googleUser";
import { NetworkingContext } from "../types/NetworkingContext";
import { loginOAuth } from "../utils/oauthLogin";

@ObjectType()
export class OAuthResponse {
  @Field(() => User, { nullable: true })
  user: User | null;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello(@Ctx() { req }: NetworkingContext) {
    req.session.userId = 1;
    return "Hello from your backend";
  }

  @Query(() => User)
  async me(@Ctx() { req }: NetworkingContext) {
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
    @Args() userData: GoogleUser,
    @Ctx() { res, req }: NetworkingContext
  ): Promise<OAuthResponse> {
    const email = userData.email;

    if (!email || !email.length || !validateEmailWithRegex(email)) {
      throw new Error("Invalid email.");
    }

    let user: User | undefined = await User.findOne({ where: { email } });

    if (user) {
      if (user.provider === "google") {
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
      });
    } catch (err) {}

    user = await User.findOne({ where: { email } });

    return loginOAuth(user!, req, res);
  }
}
