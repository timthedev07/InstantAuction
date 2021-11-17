import { Resolver, Mutation, UseMiddleware, Ctx, Arg, Int } from "type-graphql";
import { auctionExposedRelations } from "../../constants/exposed-relations";
import { Auction } from "../../entity/Auction";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class CloseAuctionResolver {
  @Mutation(() => Auction)
  @UseMiddleware(isAuth)
  async closeAuction(
    @Ctx() { req }: NetworkingContext,
    @Arg("auctionId", () => Int) auctionId: number
  ): Promise<Auction> {
    const auction = await Auction.findOne(auctionId, { relations: ["seller"] });

    if (!auction) {
      throw new Error("Invalid auction");
    }

    if (auction.seller.id !== req.session.userId) {
      throw new Error("Unauthorized");
    }

    await Auction.update(auction.id, {
      status: "closed",
      dateUpdated: new Date()
    });

    return await Auction.findOne(auction.id, {
      relations: auctionExposedRelations
    });
  }
}
