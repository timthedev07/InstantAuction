import { Resolver, Mutation, UseMiddleware, Ctx, Arg, Int } from "type-graphql";
import {
  invalidBidId,
  unauthorizedErrorMessage,
} from "../../constants/errorMessages";
import { Bid } from "../../entity/Bid";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class DeleteBidResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteBid(
    @Ctx() { req }: NetworkingContext,
    @Arg("bidId", () => Int) bidId: number
  ): Promise<boolean> {
    const userId = req.session.userId;

    const bid = await Bid.findOne(bidId, { relations: ["bidder"] });

    if (!bid) {
      throw new Error(invalidBidId);
    }

    if (bid.bidder.id !== userId) {
      throw new Error(unauthorizedErrorMessage);
    }

    await Bid.delete(bid.id);

    return true;
  }
}
