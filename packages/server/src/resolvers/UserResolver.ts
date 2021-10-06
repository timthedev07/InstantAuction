import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { hash, compare } from "bcrypt";
import { User } from "../entity/User";
import { MyContext } from "../types/MyContext";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../utils/AuthHelper";
import { verify } from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail";
import { createActionUrl } from "../utils/createActionUrl";
import { redisClient } from "../redis";
import {
  CONFIRM_EMAIL_LETTER_CONTENT,
  RESET_PASSWORD_LETTER_CONTENT,
} from "../constants/email";

const EMAIL_VALIDATION_REGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const validateEmail = (email: string) => {
  return EMAIL_VALIDATION_REGEX.test(email);
};

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<boolean> {
    const hashed = await hash(password, 12);

    if (!validateEmail(email)) {
      throw new Error("Invalid email");
    }

    if (password.length < 8) {
      throw new Error("Password too short");
    }

    try {
      const threeDaysAgo = new Date().valueOf() - 1000 * 60 * 60 * 24 * 3;

      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("confirmed = :confirmed AND memberSince <= :threeDaysAgo", {
          confirmed: false,
          threeDaysAgo,
        })
        .returning("*")
        .execute();

      await User.insert({
        email: email,
        password: hashed,
      });
    } catch (err) {
      throw new Error("Email/username already registered");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Registration failed");
    }

    await sendEmail(
      email,
      await createActionUrl(user.id, "confirm"),
      "verify",
      "email",
      CONFIRM_EMAIL_LETTER_CONTENT
    );

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    let user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Invalid username/password");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("Invalid username/password");
    }

    if (!user.confirmed) {
      throw new Error("Please verify your email before logging in");
    }

    const token = createRefreshToken(user);
    sendRefreshToken(res, token);

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);
    return true;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      context.payload = payload as any;
      const res = await User.findOne(payload.userId);
      if (res && res.confirmed) {
        return res;
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");
    return true;
  }

  @Mutation(() => LoginResponse)
  async confirmUser(
    @Arg("token") token: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const userId = await redisClient.get(token);
    if (!userId) throw new Error("Invalid token");

    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });

    redisClient.del(token);

    const user = await User.findOne({ where: { id: userId } })!;

    const refreshToken = createRefreshToken(user!);
    sendRefreshToken(res, refreshToken);

    return {
      accessToken: createAccessToken(user!),
      user: user!,
    };
  }

  @Mutation(() => Boolean)
  async resendConfirmationUrl(@Arg("email") email: string) {
    try {
      const user = await User.findOne({ where: { email } });
      if (user && !user.confirmed) {
        await sendEmail(
          email,
          await createActionUrl(user.id, "confirm"),
          "verify",
          "email",
          CONFIRM_EMAIL_LETTER_CONTENT
        );
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return true;
    }

    await sendEmail(
      email,
      await createActionUrl(user.id, "forgot-password"),
      "reset",
      "password",
      RESET_PASSWORD_LETTER_CONTENT
    );

    return true;
  }

  @Mutation(() => Boolean)
  async validTmpToken(@Arg("token") token: string) {
    const res = await redisClient.get(token);
    return !!res;
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Arg("confirmation") confirmation: string
  ) {
    if (!newPassword.length || !confirmation.length) {
      return false;
    }

    if (newPassword !== confirmation) {
      return false;
    }

    if (newPassword.length < 8) {
      return false;
    }

    const userId = await redisClient.get(token);

    if (!userId) {
      return false;
    }

    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ password: await hash(newPassword, 12) })
        .where("id = :id", { id: parseInt(userId) })
        .execute();

      await redisClient.del(token);

      return true;
    } catch (err) {
      return false;
    }
  }
}
