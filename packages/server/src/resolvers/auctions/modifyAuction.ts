import { Resolver, Mutation, UseMiddleware, Arg, Ctx } from "type-graphql";
import { Auction } from "../../entity/Auction";
import { isAuth } from "../../utils/isAuthMiddleware";
import { NetworkingContext } from "../../types/NetworkingContext";
import {
  auctionClosed,
  invalidAuction,
  unauthorizedErrorMessage,
} from "../../constants/errorMessages";
import { ModifyAuctionPartialUpdate } from "../../types/partialModifyAuction";
import { auctionExposedRelations } from "../../constants/exposed-relations";

@Resolver()
export class ModifyAuctionResolver {
  @Mutation(() => Auction)
  @UseMiddleware(isAuth)
  async modifyAuction(
    @Arg("auctionId", () => String) auctionId: string,
    @Arg("partialUpdate") partialUpdate: ModifyAuctionPartialUpdate,
    @Ctx() { req }: NetworkingContext
  ) {
    const auction = await Auction.findOne(auctionId, { relations: ["seller"] });

    if (!auction) {
      throw new Error(invalidAuction);
    }

    // check the ownership
    if (auction.seller.id !== req.session.userId) {
      throw new Error(unauthorizedErrorMessage);
    }

    if (auction.status === "closed") {
      throw new Error(auctionClosed);
    }

    await Auction.update(auctionId, partialUpdate);

    return await Auction.findOne(auctionId, {
      relations: auctionExposedRelations,
    });
  }
}
