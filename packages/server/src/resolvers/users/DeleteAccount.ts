import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";
import { rateLimit } from "../../utils/rateLimit";

@Resolver()
export class DeleteAccountResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(
    rateLimit(0, 1, {
      timeFrame: 60 * 3,
    })
  )
  async deleteAccount(
    @Arg("email") email: string,
    @Ctx() { req }: NetworkingContext
  ): Promise<boolean> {
    const userId = req.session.userId;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error("User does not exist");
    }

    if (user.email !== email) {
      throw new Error("Incorrect email");
    }

    try {
      await User.delete({ id: userId });
    } catch (err) {
      throw new Error("Something unexpected happened, try again later.");
    }

    return true;
  }
}
