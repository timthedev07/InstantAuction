import { Connection } from "typeorm";
import { getTestConnection } from "../test-utils/testConn";
import { User } from "../entity/User";
import {
  setAuctionCreator,
  testAuctionResolvers,
  testAuctionResolversFinal,
} from "./AuctionResolvers.test";
import { testItemResolvers } from "./ItemResolvers.test";
import { testBidResolvers } from "./BidResolvers.test";
import faker from "faker";

export let connection: Connection;
export let users: User[];

const getFakeUser = () => {
  return {
    avatarUrl: "https://avatars.githubusercontent.com/u/65774333?v=4",
    email: faker.internet.email(),
    externalId: faker.internet.password(),
    provider: "Google",
    username: faker.internet.userName(),
  };
};

// register a user to pass auth check
beforeAll(async () => {
  const result = await getTestConnection();
  connection = result[0];

  const { raw } = await User.insert(getFakeUser());
  const { raw: raw1 } = await User.insert(getFakeUser());
  const { raw: raw2 } = await User.insert(getFakeUser());

  users = [
    await User.findOne(raw[0].id),
    await User.findOne(raw1[0].id),
    await User.findOne(raw2[0].id),
  ];

  setAuctionCreator(users[0]);
});

describe("InstantAuction Backend Testing", () => {
  describe("Item Resolvers", testItemResolvers);
  describe("Auction Resolvers - 0", testAuctionResolvers);
  describe("Bid Resolvers", testBidResolvers);
  describe("Auction Resolvers - 1", testAuctionResolversFinal);
});

afterAll(async () => {
  await connection.close();
});
