import { Bid } from "../entity/Bid";
import {
  alreadyParticipating,
  auctionClosed,
  cannotRebid,
  notYourOwnAuctionMessage,
} from "../constants/errorMessages";
import { gqlErrorMessage } from "../test-utils/accessGraphqlError";
import { callGraphql } from "../test-utils/callGraphql";
import {
  auction2Id,
  auctionCreator,
  auctionId,
  closedAuctionId,
} from "./AuctionResolvers.test";
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
          auctionId,
        },
      });

      expect(result.errors.length).toBeGreaterThan(0);
      expect(gqlErrorMessage(result.errors)).toBe(notYourOwnAuctionMessage);
    });

    it("successfully creates a bid", async () => {
      const actionUser = users[1];
      const itemId = items[actionUser.id][1].id;
      const result = await callGraphql({
        source: createBidSource,
        userId: actionUser.id,
        variableValues: {
          itemId,
          auctionId,
        },
      });

      expect(result.data.createBid).toMatchObject({
        bidder: {
          username: actionUser.username,
        },
        item: {
          id: itemId,
        },
      });
    });

    it("rejects an item already participating in an auction", async () => {
      const actionUser = users[1];
      const result = await callGraphql({
        source: createBidSource,
        userId: actionUser.id,
        variableValues: {
          itemId: items[actionUser.id][1].id,
          auctionId: auction2Id,
        },
      });

      expect(gqlErrorMessage(result.errors)).toBe(alreadyParticipating);
    });

    it("rejects bid from an existing bidder", async () => {
      const actionUserId = users[1].id;
      const result = await callGraphql({
        source: createBidSource,
        userId: actionUserId,
        variableValues: {
          itemId: items[actionUserId][2].id,
          auctionId,
        },
      });

      expect(gqlErrorMessage(result.errors)).toBe<string>(cannotRebid);
    });

    it("rejects bid for a closed auction", async () => {
      const actionUserId = users[2].id;
      const result = await callGraphql({
        source: createBidSource,
        userId: actionUserId,
        variableValues: {
          itemId: items[actionUserId][3].id,
          auctionId: closedAuctionId,
        },
      });

      expect(gqlErrorMessage(result.errors)).toBe(auctionClosed);
    });
  });
};
