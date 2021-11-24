import { Resolver, Mutation, Int } from "type-graphql";
import { Auction } from "../../entity/Auction";
import { isAuth } from "../../utils/isAuthMiddleware";
import { NetworkingContext } from "../../types/NetworkingContext";
import { unauthorizedErrorMessage } from "../../constants/errorMessages";

@Resolver()
export class ModifyAuctionResolver {
  @Mutation(() => Auction)
  @UseMiddleware(isAuth)
  async modifyAuction(
    @Arg("auctionId", () => Int) auctionId: number,
    @Arg("update object") object: Object,
    @Ctx() { req }: NetworkingContext
  ) {
    const auction = await Auction.findOne(auctionId, { relations: ["seller"] });

    // check the ownership
    if (auction.seller.id !== req.session.userId) {
      throw new Error(unauthorizedErrorMessage);
    }

    const updateResult = await Auction.update(auctionId, {});
  }
}
