import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";
@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { req }: NetworkingContext) {
    const userId = req.session.userId;

    if (!userId) {
      return null;
    }

    try {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return null;
      }
      return user;
    } catch (err) {
      return null;
    }
  }
}
