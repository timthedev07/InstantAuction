import {
  invalidAuction,
  invalidWinningBidId,
  unauthorizedErrorMessage,
  auctionClosed,
} from "../constants/errorMessages";
import { Auction } from "../entity/Auction";
import { Item } from "../entity/Item";
import { gqlErrorMessage } from "../test-utils/accessGraphqlError";
import { callGraphql } from "../test-utils/callGraphql";
import { auctionCreator, auctionId, auction2Id } from "./AuctionResolvers.test";
import { users } from "./index.test";
import {
  endAuctionSource,
  modifyAuctionSource,
  deleteAuctionSource,
} from "./sources";

let chosenItemId: number;

describe("Auction Resolvers #2", () => {
  // ending an auction
  describe("End Auction Resolver", () => {
    it("rejects invalid auction id", async () => {
      const result = await callGraphql({
        source: endAuctionSource,
        userId: auctionCreator.id,
        variableValues: {
          auctionId: -5,
          winningBidId: 3,
        },
      });
      expect(gqlErrorMessage(result.errors)).toBe(invalidAuction);
    });

    it("rejects invalid winning bid id", async () => {
      const result = await callGraphql({
        source: endAuctionSource,
        userId: auctionCreator.id,
        variableValues: {
          auctionId,
          winningBidId: -5,
        },
      });
      expect(gqlErrorMessage(result.errors)).toBe(invalidWinningBidId);
    });

    it("ends the auction and declares the winner", async () => {
      const chosenBid = (await Auction.findOne(auctionId, {
        relations: ["bids", "bids.bidder", "bids.item"],
      })).bids[0];

      chosenItemId = chosenBid.item.id;

      const result = await callGraphql({
        source: endAuctionSource,
        userId: auctionCreator.id,
        variableValues: {
          auctionId,
          winningBidId: chosenBid.id,
        },
      });
      expect(result.data.endAuction).toMatchObject({
        winner: {
          username: chosenBid.bidder.username,
        },
        status: "closed",
      });
    });

    it("deletes the selected bid's item after an auction has ended", async () => {
      const result = await Item.findOne(chosenItemId);
      expect(result).toBeFalsy();
    });
  });

  // modifying an auction
  describe("Modify Auction Resolver", () => {
    it("rejects invalid auction id", async () => {
      const result = await callGraphql({
        userId: auctionCreator.id,
        source: modifyAuctionSource,
        variableValues: {
          partialUpdate: {
            title: "",
            description: "",
          },
          auctionId: -5555,
        },
      });

      expect(gqlErrorMessage(result.errors)).toBe(invalidAuction);
    });

    it("rejects auction not owned by the user", async () => {
      const result = await callGraphql({
        userId: users[1].id,
        source: modifyAuctionSource,
        variableValues: {
          partialUpdate: {
            title: "",
            description: "",
          },
          auctionId: auctionId,
        },
      });

      expect(gqlErrorMessage(result.errors)).toBe(unauthorizedErrorMessage);
    });

    it("rejects closed auctions", async () => {
      const result = await callGraphql({
        userId: auctionCreator.id,
        source: modifyAuctionSource,
        variableValues: {
          partialUpdate: {
            title: "",
            description: "",
          },
          auctionId: auctionId,
        },
      });

      expect(gqlErrorMessage(result.errors)).toBe(auctionClosed);
    });

    it("successfully updates the given auction", async () => {
      const partialUpdate = {
        title: "auction2Modified",
        description: "I am not jezz befos nor zark muckerberg",
      };
      const result = await callGraphql({
        userId: auctionCreator.id,
        source: modifyAuctionSource,
        variableValues: {
          partialUpdate,
          auctionId: auction2Id,
        },
      });

      expect(result.data).toMatchObject({
        modifyAuction: partialUpdate,
      });
    });
  });

  // deleting an auction
  describe("Delete Auction Resolver", () => {
    it("rejects invalid auction id", async () => {
      const { errors } = await callGraphql({
        source: deleteAuctionSource,
        userId: auctionCreator.id,
        variableValues: {
          auctionId: -10,
        },
      });

      expect(errors).toBeTruthy();
      expect(errors.length).toBeGreaterThan(0);
    });

    it("deletes the given auction", async () => {
      const result = await callGraphql({
        source: deleteAuctionSource,
        userId: auctionCreator.id,
        variableValues: {
          auctionId,
        },
      });

      expect(result.data).toBeTruthy();
      expect(result.data.deleteAuction).toEqual(true);
    });
  });
});
