import { Connection } from "typeorm";
import { getTestConnection } from "../test-utils/testConn";
import { User } from "../entity/User";
import {
  testAuctionResolvers,
  testAuctionResolversFinal
} from "./AuctionResolvers.test";
import { testItemResolvers } from "./ItemResolvers.test";
import { testBidResolvers } from "./BidResolvers.test";

export let connection: Connection;
export let users: User[];

// register a user to pass auth check
beforeAll(async () => {
  const result = await getTestConnection();
  connection = result[0];

  const { raw } = await User.insert({
    avatarUrl: "https://avatars.githubusercontent.com/u/65774333?v=4",
    email: "jeff@jeff.org",
    externalId: "333",
    provider: "Google",
    username: "Jeff"
  });
  const { raw: raw1 } = await User.insert({
    avatarUrl: "https://avatars.githubusercontent.com/u/87135844?v=4",
    email: "chris@white.com",
    externalId: "194817249812",
    provider: "Discord",
    username: "i.am.entrepreneur"
  });
  const { raw: raw2 } = await User.insert({
    avatarUrl: "https://avatars.githubusercontent.com/u/87135844?v=4",
    email: "john@carlson.com",
    externalId: "iamjeffbezos",
    provider: "Google",
    username: "JEFFZEBOSISHERE"
  });

  users = [
    await User.findOne(raw[0].id),
    await User.findOne(raw1[0].id),
    await User.findOne(raw2[0].id)
  ];
});

describe("InstantAuction Backend Server Unit Testing", () => {
  describe("Item Resolvers", testItemResolvers);
  describe("Auction Resolvers - 0", testAuctionResolvers);
  describe("Bid Resolvers", testBidResolvers);
  describe("Auction Resolvers - 1", testAuctionResolversFinal);
});

afterAll(async () => {
  await connection.close();
});
