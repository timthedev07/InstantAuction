import { Ctx, Query, Resolver } from "type-graphql";
import { notAuthenticatedErrorMessage } from "../../constants/errorMessages";
import { User } from "../../entity/User";
import { NetworkingContext } from "../../types/NetworkingContext";
@Resolver()
export class GetProfileResolver {
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
}
