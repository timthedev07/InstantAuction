import { Resolver, Mutation, UseMiddleware, Ctx, Arg } from "type-graphql";
import { Auction } from "../../entity/Auction";
import { User } from "../../entity/User";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class CreateAuctionResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createAuction(
    @Arg("title")
    title: string,
    @Arg("description")
    description: string,
    @Ctx() { req }: NetworkingContext
  ) {
    try {
      const seller = await User.findOne(req.session.userId);
      await Auction.insert({
        bids: [],
        description,
        title,
        status: "open",
        seller
      });
    } catch (err) {
      return false;
    }
    return true;
  }
}
