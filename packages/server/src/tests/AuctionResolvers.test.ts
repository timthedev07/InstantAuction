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
    it("successfully mutates auction status", () => {
      auctionId;
    });
  });
};
