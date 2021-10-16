import { Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class DeleteAccountResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteAccount(@Ctx() { req }: NetworkingContext): Promise<boolean> {
    const userId = req.session.userId;

    try {
      await User.delete({ id: userId });
    } catch (err) {
      throw new Error("Something unexpected happened, try again later.");
    }

    return true;
  }
}
