import {
  Resolver,
  Query,
  UseMiddleware,
  Ctx,
  Int,
  ObjectType,
  Field,
  Arg
} from "type-graphql";
import { Item } from "../../entity/Item";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

@ObjectType()
class ItemsResponse {
  @Field(() => Int)
  count: number;

  @Field(() => [Item])
  items: Item[];
}

@Resolver()
export class UserItemsResolver {
  @Query(() => ItemsResponse)
  @UseMiddleware(isAuth)
  async userItems(
    @Ctx() { req }: NetworkingContext,
    @Arg("excludeAuctionedOff") excludeAuctionedOff: boolean
  ) {
    const [items, count] = await Item.findAndCount({
      relations: ["owner"],
      where: {
        owner: req.session.userId,
        // filter based on the parameter
        auctionedOff: excludeAuctionedOff || undefined
      }
    });
    console.log(items);
    return { items, count };
  }
}
