import { Resolver, Mutation, UseMiddleware, Ctx, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuthStrict } from "../../utils/isAuthMiddleware";

@Resolver()
export class UpdateEmailVisibilityResolver {
  @Mutation(() => User)
  @UseMiddleware(isAuthStrict)
  async updateEmailVisibility(
    @Ctx() { req }: NetworkingContext,
    @Arg("newEmailPublic") newEmailPublic: boolean
  ): Promise<User> {
    const userId = req.session.userId;

    await User.update(userId, {
      emailPublic: newEmailPublic,
    });

    return await User.findOne(userId);
  }
}
