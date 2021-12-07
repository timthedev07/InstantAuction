import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { NetworkingContext } from "../../types/NetworkingContext";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
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
