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
  hello() {
    return "Hello from your backend";
  }

  @Mutation(() => OAuthResponse)
  async googleOAuth(
    @Args() userData: GoogleUser,
    @Ctx() { res: response }: NetworkingContext
  ): Promise<OAuthResponse> {
    const email = userData.email;

    if (!email || !email.length || !validateEmailWithRegex(email)) {
      throw new Error("Invalid email.");
    }

    let user: User | undefined = await User.findOne({ where: { email } });

    if (user) {
      if (user.provider === "google") {
        return loginOAuth(user, response);
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

    return loginOAuth(user!, response);
  }
}
