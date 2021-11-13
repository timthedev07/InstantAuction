import { Resolver, Query, ObjectType, Field, Int } from "type-graphql";
import { auctionExposedRelations } from "../../constants/exposed-relations";
import { Auction } from "../../entity/Auction";

@ObjectType()
class AllAuctionsResponse {
  @Field(() => Int)
  count: number;

  @Field(() => [Auction])
  auctions: Auction[];
}

@Resolver()
export class AllAuctionsResolver {
  @Query(() => AllAuctionsResponse)
  async allAuctions(): Promise<AllAuctionsResponse> {
    const queryResult = await Auction.findAndCount({
      relations: auctionExposedRelations
    });
    // TODO: might need to add some filtering/sorting feature in the future
    return {
      auctions: queryResult[0],
      count: queryResult[1]
    };
  }
}
