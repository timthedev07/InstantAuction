import { Resolver, Mutation, UseMiddleware, Ctx, Arg } from "type-graphql";
import {
  invalidAuction,
  unauthorizedErrorMessage,
} from "../../constants/errorMessages";
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
    @Arg("auctionId", () => String) auctionId: string
  ): Promise<Auction> {
    const auction = await Auction.findOne(auctionId, { relations: ["seller"] });

    if (!auction) {
      throw new Error(invalidAuction);
    }

    if (auction.seller.id !== req.session.userId) {
      throw new Error(unauthorizedErrorMessage);
    }

    await Auction.update(auction.id, {
      status: "closed",
      dateUpdated: new Date(),
    });

    return await Auction.findOne(auction.id, {
      relations: auctionExposedRelations,
    });
  }
}
