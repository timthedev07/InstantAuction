import {
  Ctx,
  Field,
  Int,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";
import { getConnection } from "typeorm";
import { Item } from "../../entity/Item";

@ObjectType()
export class UserItemsResponse {
  @Field(() => [Item])
  items: Item[];

  @Field(() => Int)
  count: number;
}

@Resolver()
export class GetUserItemsResolver {
  @Query(() => UserItemsResponse)
  @UseMiddleware(isAuth)
  async getUserItems(@Ctx() { req }: NetworkingContext): Promise<
    UserItemsResponse
  > {
    const userId = req.session.userId!;
    const repo = getConnection().getRepository(Item);
    const result = await repo
      .createQueryBuilder("item")
      .innerJoinAndSelect("item.owner", "owner")
      .where("owner.id = :id", { id: userId })
      .getManyAndCount();
    return {
      items: result[0],
      count: result[1]
    };
  }
}
