import { callGraphql } from "../test-utils/callGraphql";
import { user } from "./index.test";
import { Item } from "../entity/Item";

export let items: Item[] = [];

export const testItemResolvers = () => {
  const source = `
mutation CreateItemWithPictureUrl($pictureUrl: String!, $name: String!) {
  createItemWithPictureUrl(pictureUrl: $pictureUrl, name: $name) {
    id
    picture
    name
  }
}
`;
  // item creation unit test
  it("creates an item", async () => {
    const itemNames = [
      "heat",
      "Mr. K",
      "iPhone 129 from the future",
      "ultraviolet",
      "infrared"
    ];
    itemNames.forEach(async each => {
      const result = await callGraphql({
        source,
        variableValues: {
          name: each,
          pictureUrl:
            "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/29a25eda-7921-4362-ba7c-ef5b2c429505/q076ls/std/488x325/29a25eda-7921-4362-ba7c-ef5b2c429505?scalemode=auto"
        },
        userId: user.id
      });
      expect(result.data).toBeTruthy();
      items.push(result.data.createItemWithPictureUrl);
    });
  });
};
