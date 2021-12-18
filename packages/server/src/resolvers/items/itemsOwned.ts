import {
  Arg,
  Ctx,
  Field,
  Int,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";
import { Item } from "../../entity/Item";

@ObjectType()
export class UserItemsResponse {
  @Field(() => [Item])
  items: Item[];

  @Field(() => Int)
  count: number;
}

@Resolver()
export class ItemsOwned {
  @Query(() => UserItemsResponse)
  @UseMiddleware(isAuth)
  async itemsOwned(
    @Ctx() { req }: NetworkingContext,
    @Arg("excludeAuctionedOff") excludeAuctionedOff: boolean
  ): Promise<UserItemsResponse> {
    const [items, count] = await Item.findAndCount({
      relations: ["owner"],
      where: {
        owner: { id: req.session.userId },
        // filter based on the parameter
        ...(excludeAuctionedOff && {
          participating: false,
        }),
      },
    });
    return {
      items,
      count,
    };
  }
}
