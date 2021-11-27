import { callGraphql } from "../test-utils/callGraphql";
import faker from "faker";
import {
  allAuctionsSource,
  closeAuctionSource,
  createAuctionSource,
  deleteAuctionSource,
  endAuctionSource,
  modifyAuctionSource,
} from "./sources";
import { User } from "../entity/User";
import { items } from "./ItemResolvers.test";
import { Auction } from "../entity/Auction";
import { gqlErrorMessage } from "../test-utils/accessGraphqlError";
import {
  auctionClosed,
  invalidAuction,
  invalidWinningBidId,
  unauthorizedErrorMessage,
} from "../constants/errorMessages";
import { Item } from "../entity/Item";
import { users } from "./index.test";

export let auctionId: number;
export let auction2Id: number;
export let auctionCreator: User;
export let closedAuctionId: number;
let allAuctionsResult: any;
let chosenItemId: number;

export const setAuctionCreator = (user: User) => (auctionCreator = user);

export const testAuctionResolvers = () => {
  // creating an auction
  describe("Create Auction Resolver", () => {
    it("rejects invalid item id", async () => {
      const result = await callGraphql({
        source: createAuctionSource,
        variableValues: {
          title: faker.lorem.word(),
          description: faker.lorem.paragraph(2),
          itemId: -5,
        },
        userId: auctionCreator.id,
      });
      expect(result.errors).toBeTruthy();
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("creates auctions", async () => {
      // create an auction
      let result = await callGraphql({
        source: createAuctionSource,
        variableValues: {
          title: faker.lorem.word(),
          description: faker.lorem.paragraph(2),
          itemId: items[auctionCreator.id][0].id,
        },
        userId: auctionCreator.id,
      });
      expect(result.data).toBeTruthy();
      auctionId = result.data.createAuction.id;

      // creates another auction
      result = await callGraphql({
        source: createAuctionSource,
        variableValues: {
          title: faker.lorem.word(),
          description: faker.lorem.paragraph(2),
          itemId: items[auctionCreator.id][1].id,
        },
        userId: auctionCreator.id,
      });
      auction2Id = result.data.createAuction.id;
    });

    it("rejects an item already participating", async () => {
      const result = await callGraphql({
        source: createAuctionSource,
        variableValues: {
          title: faker.lorem.word(),
          description: faker.lorem.paragraph(2),
          itemId: 1,
        },
        userId: auctionCreator.id,
      });
      expect(result.errors).toBeTruthy();
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  // closing an auction
  describe("Close auction Resolver", () => {
    it("successfully mutates auction status", async () => {
      const { raw } = await Auction.insert({
        bids: [],
        description: "Close me please.",
        title: "Dog water",
        seller: { id: auctionCreator.id },
        item: { id: items[auctionCreator.id].at(-1).id },
      });
      const result = await callGraphql({
        source: closeAuctionSource,
        userId: auctionCreator.id,
        variableValues: {
          auctionId: raw[0].id,
        },
      });

      expect(result.data).toBeTruthy();
      expect(result.data.closeAuction.status).toBe("closed");
      closedAuctionId = result.data.closeAuction.id;
    });

    it("rejects invalid auction id", async () => {
      const result = await callGraphql({
        source: closeAuctionSource,
        userId: auctionCreator.id,
        variableValues: {
          auctionId: -100,
        },
      });

      expect(result.errors).toBeTruthy();
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  // retrieving all of the auctions
  describe("All Auctions Resolver", () => {
    it("retrieves all auctions", async () => {
      allAuctionsResult = await callGraphql({
        source: allAuctionsSource,
      });

      const auctions = allAuctionsResult.data.allAuctions.auctions;
      expect(allAuctionsResult.data).toBeTruthy();
      expect(auctions).toBeTruthy();
      expect(auctions.length).toBeGreaterThan(0);
    });

    it("retrieves the correct count", async () => {
      const { count, auctions } = allAuctionsResult.data.allAuctions;
      expect(count).toBeTruthy();
      expect(typeof count).toBe("number");
      expect(count).toEqual(auctions.length);
    });
  });
};

export const testAuctionResolversFinal = () => {
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
};
