import { callGraphql } from "../test-utils/callGraphql";
import faker from "faker";
import { user } from "./index.test";
import {
  allAuctionsSource,
  closeAuctionSource,
  createAuctionSource,
  deleteAuctionSource
} from "./sources";

let auctionId: number;
let allAuctionsResult: any;

export const testAuctionResolvers = () => {
  // creating an auction
  describe("Create Auction Resolver", () => {
    it("rejects invalid item id", async () => {
      const result = await callGraphql({
        source: createAuctionSource,
        variableValues: {
          title: faker.lorem.word(),
          description: faker.lorem.paragraph(2),
          itemId: -5
        },
        userId: user.id
      });
      expect(result.errors).toBeTruthy();
      expect(result.errors.length).toBeGreaterThan(0);
    });
    it("creates an auction", async () => {
      const result = await callGraphql({
        source: createAuctionSource,
        variableValues: {
          title: faker.lorem.word(),
          description: faker.lorem.paragraph(2),
          itemId: 1
        },
        userId: user.id
      });
      expect(result.data).toBeTruthy();
      auctionId = result.data.createAuction.id;
    });
  });

  // closing an auction
  describe("Close auction Resolver", () => {
    it("successfully mutates auction status", async () => {
      const result = await callGraphql({
        source: closeAuctionSource,
        userId: user.id,
        variableValues: {
          auctionId
        }
      });

      expect(result.data).toBeTruthy();
      expect(result.data.closeAuction.status).toBe("closed");
    });

    it("rejects invalid auction id", async () => {
      const result = await callGraphql({
        source: closeAuctionSource,
        userId: user.id,
        variableValues: {
          auctionId: -100
        }
      });

      expect(result.errors).toBeTruthy();
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  // retrieving all of the auctions
  describe("All Auctions Resolver", () => {
    it("retrieves all auctions", async () => {
      allAuctionsResult = await callGraphql({
        source: allAuctionsSource
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

  // deleting an auction
  describe("Delete Auction Resolver", () => {
    it("rejects invalid auction id", async () => {
      const { errors } = await callGraphql({
        source: deleteAuctionSource,
        userId: user.id,
        variableValues: {
          auctionId: -10
        }
      });

      expect(errors).toBeTruthy();
      expect(errors.length).toBeGreaterThan(0);
    });

    it("deletes the given auction", async () => {
      const result = await callGraphql({
        source: deleteAuctionSource,
        userId: user.id,
        variableValues: {
          auctionId
        }
      });

      expect(result.data).toBeTruthy();
      expect(result.data.deleteAuction).toEqual(true);
    });
  });
};
