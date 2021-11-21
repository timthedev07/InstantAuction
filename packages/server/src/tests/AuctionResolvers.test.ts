import { callGraphql } from "../test-utils/callGraphql";
import faker from "faker";
import {
  allAuctionsSource,
  closeAuctionSource,
  createAuctionSource,
  deleteAuctionSource,
  endAuctionSource,
} from "./sources";
import { User } from "../entity/User";
import { items } from "./ItemResolvers.test";

export let auctionId: number;
export let auction2Id: number;
let allAuctionsResult: any;
export let auctionCreator: User;

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
      const result = await callGraphql({
        source: closeAuctionSource,
        userId: auctionCreator.id,
        variableValues: {
          auctionId,
        },
      });

      expect(result.data).toBeTruthy();
      expect(result.data.closeAuction.status).toBe("closed");
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
    it("rejects invalid", async () => {
      const result = await callGraphql({
        source: endAuctionSource,
        userId: auctionCreator.id,
        variableValues: {
          auctionId,
          winningBidId: 3,
        },
      });
      result;
      expect(3).toBe(3);
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
