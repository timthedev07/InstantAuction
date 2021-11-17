import { callGraphql } from "../test-utils/callGraphql";
import faker from "faker";
import { user } from "./index.test";

const createAuctionSource = `
mutation CreateAuction($title: String!, $description: String!, $itemId: Int!) {
  createAuction(title: $title, description: $description, itemId: $itemId) {
    id
    title
    description
    seller {
      username
    }
    status
    dateCreated
    dateUpdated
    item {
      id
      picture
      name
    }
  }
}
`;

const closeAuctionSource = `
mutation CloseAuction($auctionId: Int!) {
  closeAuction(auctionId: $auctionId) {
    id
    title
    description
    seller {
      username
    }
    status
    dateCreated
    dateUpdated
    item {
      id
      picture
      name
    }
  }
}
`;

let auctionId: number;

export const testAuctionResolvers = () => {
  describe("Create Auction", () => {
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

  describe("Close auction", () => {
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

    it("rejects invalid item id", async () => {
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
};
