import {
  Resolver,
  Query,
  UseMiddleware,
  Ctx,
  ObjectType,
  Field,
  Int,
} from "type-graphql";
import { bidExposedRelations } from "../../constants/exposed-relations";
import { Bid } from "../../entity/Bid";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuthStrict } from "../../utils/isAuthMiddleware";

@ObjectType()
export class BidsResponse {
  @Field(() => Int)
  count: number;

  @Field(() => [Bid])
  bids: Bid[];
}

@Resolver()
export class GetUserBidsResolver {
  @Query(() => BidsResponse)
  @UseMiddleware(isAuthStrict)
  async getUserBids(@Ctx() { req }: NetworkingContext): Promise<BidsResponse> {
    const [bids, count] = await Bid.findAndCount({
      where: {
        bidder: {
          id: req.session.userId,
        },
      },
      relations: bidExposedRelations,
    });

    return {
      bids,
      count,
    };
  }
}
