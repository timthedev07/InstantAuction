import {
  Arg,
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
  async getUserItems(
    @Ctx() { req }: NetworkingContext,
    @Arg("excludeAuctionedOff") excludeAuctionedOff: boolean
  ): Promise<UserItemsResponse> {
    const [items, count] = await Item.findAndCount({
      relations: ["owner"],
      where: {
        owner: { id: req.session.userId },
        // filter based on the parameter
        auctionedOff: excludeAuctionedOff === true ? false : undefined
      }
    });
    return {
      items,
      count
    };
  }
}
