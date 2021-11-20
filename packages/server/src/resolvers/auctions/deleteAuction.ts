import { Resolver, Mutation, UseMiddleware, Ctx, Arg, Int } from "type-graphql";
import { unauthorizedErrorMessage } from "../../constants/errorMessages";
import { Auction } from "../../entity/Auction";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class DeleteAuctionResolver {
  @Mutation(() => Boolean)
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
      throw new Error(unauthorizedErrorMessage);
    }

    await Auction.remove(auction);

    return true;
  }
}
