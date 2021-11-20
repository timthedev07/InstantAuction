import { Bid } from "../entity/Bid";
import {
  alreadyParticipating,
  cannotRebid,
  notYourOwnAuctionMessage
} from "../resolvers/bids/createBid";
import { accessGraphqlErrorMessage } from "../test-utils/accessGraphqlError";
import { callGraphql } from "../test-utils/callGraphql";
import { auctionCreator, auctionId } from "./AuctionResolvers.test";
import { users } from "./index.test";
import { items } from "./ItemResolvers.test";
import { createBidSource } from "./sources";

export let bids: Bid[] = [];

export const testBidResolvers = () => {
  describe("Create Bid Resolver", () => {
    it("rejects bid from the auction seller", async () => {
      const result = await callGraphql({
        source: createBidSource,
        userId: auctionCreator.id,
        variableValues: {
          itemId: items[auctionCreator.id][1].id,
          auctionId
        }
      });

      expect(result.errors.length).toBeGreaterThan(0);
      expect(accessGraphqlErrorMessage(result.errors)).toBe(
        notYourOwnAuctionMessage
      );
    });

    it("rejects an item already participating in another auction", async () => {
      const actionUser = users[1];
      const result = await callGraphql({
        source: createBidSource,
        userId: actionUser.id,
        variableValues: {
          itemId: items[users[0].id][0].id,
          auctionId
        }
      });

      expect(accessGraphqlErrorMessage(result.errors)).toBe(
        alreadyParticipating
      );
    });

    it("successfully creates bids", async () => {
      const actionUser = users[1];
      const itemId = items[actionUser.id][1].id;
      const result = await callGraphql({
        source: createBidSource,
        userId: actionUser.id,
        variableValues: {
          itemId,
          auctionId
        }
      });

      expect(result.data.createBid).toMatchObject({
        bidder: {
          username: actionUser.username
        },
        item: {
          id: itemId
        }
      });
    });

    it("rejects bid from an existing bidder", async () => {
      const actionUserId = users[1].id;
      const result = await callGraphql({
        source: createBidSource,
        userId: actionUserId,
        variableValues: {
          itemId: items[actionUserId][2].id,
          auctionId
        }
      });

      expect(accessGraphqlErrorMessage(result.errors)).toBe<string>(
        cannotRebid
      );
    });
  });
};
