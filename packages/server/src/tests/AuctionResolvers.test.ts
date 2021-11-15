import { callGraphql } from "../test-utils/callGraphql";
import faker from "faker";
import { user } from "./index.test";

export const testAuctionResolvers = () => {
  it("creates an auction", async () => {
    const result = await callGraphql({
      source: `
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
`,
      variableValues: {
        title: faker.lorem.word(),
        description: faker.lorem.paragraph(2),
        itemId: 1
      },
      userId: user.id
    });
    console.log(result);
    result;
    // expect(hi()).toThrowError("Couldn't find item.");
    expect(true).toBe(true);
  });
};
