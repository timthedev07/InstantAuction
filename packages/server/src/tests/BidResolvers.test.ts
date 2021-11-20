import { Bid } from "../entity/Bid";
import {
  alreadyParticipating,
  cannotRebid,
  notYourOwnAuctionMessage
} from "../resolvers/bids/createBid";
import { accessGraphqlErrorMessage } from "../test-utils/accessGraphqlError";
import { callGraphql } from "../test-utils/callGraphql";
import { auctionId } from "./AuctionResolvers.test";
import { users } from "./index.test";
import { items } from "./ItemResolvers.test";
import { createBidSource } from "./sources";

export let bids: Bid[] = [];

export const testBidResolvers = () => {
  describe("Create Bid Resolver", () => {
    it("rejects bid from the auction seller", async () => {
      const result = await callGraphql({
        source: createBidSource,
        userId: users[0].id,
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
        userId: users[1].id,
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

    it("successfully creates bids", async () => {
      const result = await callGraphql({
        source: createBidSource,
        userId: users[1].id,
        variableValues: {
          itemId: items[1].id,
          auctionId
        }
      });

      expect(result.data.createBid).toMatchObject({
        bidder: {
          username: users[1].username
        },
        item: {
          id: items[1].id
        }
      });
    });

    it("rejects bid from an existing bidder", async () => {
      const result = await callGraphql({
        source: createBidSource,
        userId: users[1].id,
        variableValues: {
          itemId: items[2].id,
          auctionId
        }
      });

      expect(accessGraphqlErrorMessage(result.errors)).toBe<string>(
        cannotRebid
      );
    });
  });
};
