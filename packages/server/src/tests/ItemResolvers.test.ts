import { callGraphql } from "../test-utils/callGraphql";
import faker from "faker";
import { user } from "./index.test";

export const testItemResolvers = () => {
  // item creation unit test
  it("creates an item", async () => {
    const result = await callGraphql({
      source: `
mutation CreateItemWithPictureUrl($pictureUrl: String!, $name: String!) {
  createItemWithPictureUrl(pictureUrl: $pictureUrl, name: $name) {
    id
    picture
    name
  }
}
`,
      variableValues: {
        name: faker.vehicle.model(),
        pictureUrl:
          "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/29a25eda-7921-4362-ba7c-ef5b2c429505/q076ls/std/488x325/29a25eda-7921-4362-ba7c-ef5b2c429505?scalemode=auto"
      },
      userId: user.id
    });
    expect(result).toBeTruthy();
  });
};
