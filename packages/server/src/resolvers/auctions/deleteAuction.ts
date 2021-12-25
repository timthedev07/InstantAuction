import { Resolver, Mutation, UseMiddleware, Ctx, Arg } from "type-graphql";
import { unauthorizedErrorMessage } from "../../constants/errorMessages";
import { Auction } from "../../entity/Auction";
import { Item } from "../../entity/Item";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class DeleteAuctionResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteAuction(
    @Ctx() { req }: NetworkingContext,
    @Arg("auctionId", () => String) auctionId: string
  ) {
    const auction = await Auction.findOne(auctionId, {
      relations: ["seller", "item"],
    });

    if (!auction) {
      throw new Error("Invalid Auction");
    }

    if (auction.seller.id !== req.session.userId) {
      throw new Error(unauthorizedErrorMessage);
    }

    await Auction.remove(auction);
    await Item.update(auction.item.id, {
      participating: false,
    });

    return true;
  }
}
