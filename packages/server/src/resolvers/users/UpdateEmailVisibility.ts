import { Resolver, Mutation, UseMiddleware, Ctx, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuthStrict } from "../../utils/isAuthMiddleware";
import { rateLimit } from "../../utils/rateLimit";

@Resolver()
export class UpdateEmailVisibilityResolver {
  @Mutation(() => User)
  @UseMiddleware(isAuthStrict)
  @UseMiddleware(
    rateLimit(0, 3, {
      errorMessage: "Slow down, you are editing too fast.",
    })
  )
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
