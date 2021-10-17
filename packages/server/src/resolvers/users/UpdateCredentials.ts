import {
  Resolver,
  Mutation,
  Args,
  Ctx,
  UseMiddleware,
  ArgsType,
  Field,
} from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

type UpdatableUserColumns = "username";

@ArgsType()
export class PartialUser implements Partial<Pick<User, UpdatableUserColumns>> {
  @Field({ nullable: true })
  username?: string;
}

@Resolver()
export class UpdateCredentialsResolver {
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updateCredentials(
    @Args(() => PartialUser) newUserData: PartialUser,
    @Ctx() { req }: NetworkingContext
  ) {
    const userId = req.session.userId!;

    const updateResult = await getConnection()
      .createQueryBuilder()
      .update(User)
      .set(newUserData)
      .where("id = :id", { id: userId })
      .returning("*")
      .execute();

    return updateResult.raw[0];
  }
}
