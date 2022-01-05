import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";
import { bidExposedRelations } from "../../constants/exposed-relations";
import { Bid } from "../../entity/Bid";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuthStrict } from "../../utils/isAuthMiddleware";

@Resolver()
export class GetUserBidsResolver {
  @Query(() => [Bid])
  @UseMiddleware(isAuthStrict)
  getUserBids(@Ctx() { req }: NetworkingContext) {
    return Bid.find({
      where: {
        "bidder.id": req.session.userId,
      },
      relations: bidExposedRelations,
    });
  }
}
