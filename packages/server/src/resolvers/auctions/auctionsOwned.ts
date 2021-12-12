import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";
import { auctionExposedRelations } from "../../constants/exposed-relations";
import { Auction } from "../../entity/Auction";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";
import { AuctionsResponse } from "./allAuctions";

@Resolver()
export class AuctionsOwnedResolver {
  @Query(() => AuctionsResponse)
  @UseMiddleware(isAuth)
  async auctionsOwned(@Ctx() { req }: NetworkingContext): Promise<
    AuctionsResponse
  > {
    const [auctions, count] = await Auction.findAndCount({
      relations: auctionExposedRelations,
      where: {
        seller: { id: req.session.userId },
      },
    });

    return {
      auctions,
      count,
    };
  }
}
