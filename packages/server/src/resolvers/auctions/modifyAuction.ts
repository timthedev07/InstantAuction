import { Resolver, Mutation, Int, UseMiddleware, Arg, Ctx } from "type-graphql";
import { Auction } from "../../entity/Auction";
import { isAuth } from "../../utils/isAuthMiddleware";
import { NetworkingContext } from "../../types/NetworkingContext";
import {
  invalidAuction,
  unauthorizedErrorMessage,
} from "../../constants/errorMessages";
import { ModifyAuctionPartialUpdate } from "../../types/partialModifyAuction";

@Resolver()
export class ModifyAuctionResolver {
  @Mutation(() => Auction)
  @UseMiddleware(isAuth)
  async modifyAuction(
    @Arg("auctionId", () => Int) auctionId: number,
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

    await Auction.update(auctionId, partialUpdate);

    return true;
  }
}
