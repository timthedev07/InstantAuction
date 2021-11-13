import { Resolver, Mutation, UseMiddleware, Ctx, Arg, Int } from "type-graphql";
import { Auction } from "../../entity/Auction";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class DeleteAuctionResolver {
  @Mutation()
  @UseMiddleware(isAuth)
  async deleteAuction(
    @Ctx() { req }: NetworkingContext,
    @Arg("auctionId", () => Int) auctionId: number
  ) {
    const auction = await Auction.findOne(auctionId, { relations: ["seller"] });

    if (!auction) {
      throw new Error("Invalid Auction");
    }

    if (auction.seller.id !== req.session.userId) {
      throw new Error("Unauthorized");
    }

    await Auction.remove(auction);

    return true;
  }
}
