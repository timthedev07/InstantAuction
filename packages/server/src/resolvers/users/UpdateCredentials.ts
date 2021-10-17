import { Resolver, Mutation, Args, Ctx, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

type UpdatableUserColumns = "username";

@Resolver()
export class UpdateCredentialsResolver {
  @Mutation()
  @UseMiddleware(isAuth)
  async updateCredentials(
    @Args() newUserData: Partial<Pick<User, UpdatableUserColumns>>,
    @Ctx() { req }: NetworkingContext
  ) {
    const userId = req.session.userId!;

    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set(newUserData)
      .where("id = :id", { id: userId })
      .execute();

    return newUserData;
  }
}
