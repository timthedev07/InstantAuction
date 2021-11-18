import {
  alreadyParticipating,
  notYourOwnAuctionMessage
} from "../resolvers/bids/createBid";
import { accessGraphqlErrorMessage } from "../test-utils/accessGraphqlError";
import { callGraphql } from "../test-utils/callGraphql";
import { auctionId } from "./AuctionResolvers.test";
import { user, user2 } from "./index.test";
import { items } from "./ItemResolvers.test";
import { createBidSource } from "./sources";

export const testBidResolvers = () => {
  describe("Create Bid Resolver", () => {
    it("rejects bid from the auction seller", async () => {
      const result = await callGraphql({
        source: createBidSource,
        userId: user.id,
        variableValues: {
          itemId: items[1].id,
          auctionId
        }
      });

      expect(result.errors.length).toBeGreaterThan(0);
      expect(accessGraphqlErrorMessage(result.errors)).toBe(
        notYourOwnAuctionMessage
      );
    });

    it("rejects an item already participating in another auction", async () => {
      const result = await callGraphql({
        source: createBidSource,
        userId: user2.id,
        variableValues: {
          itemId: items[0].id,
          auctionId
        }
      });

      expect(result.errors.length).toBeGreaterThan(0);
      expect(accessGraphqlErrorMessage(result.errors)).toBe(
        alreadyParticipating
      );
    });
  });
};
