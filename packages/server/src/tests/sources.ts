import { readFileSync } from "fs";
import { join } from "path";

enum ResolverType {
  auctions = "auctions",
  bids = "bids",
  items = "items",
  users = "users",
}
/**
 *
 * @param gqlFilename e.g. allAuctions.graphql, createBid.graphql
 * @returns
 */
export const getSource = (gqlFilename: string, resolverType: ResolverType) => {
  const gqlFilePath = `../client-controllers/src/graphql/${resolverType}/${gqlFilename}`;
  return readFileSync(join(process.cwd(), gqlFilePath)).toString();
};

export const createAuctionSource = getSource(
  "createAuction.graphql",
  ResolverType.auctions
);

export const closeAuctionSource = getSource(
  "closeAuction.graphql",
  ResolverType.auctions
);

export const deleteAuctionSource = getSource(
  "deleteAuction.graphql",
  ResolverType.auctions
);

export const allAuctionsSource = getSource(
  "allAuctions.graphql",
  ResolverType.auctions
);

export const endAuctionSource = getSource(
  "endAuction.graphql",
  ResolverType.auctions
);

export const createBidSource = getSource(
  "createBid.graphql",
  ResolverType.bids
);

export const deleteBidSource = getSource(
  "deleteBid.graphql",
  ResolverType.bids
);

export const modifyAuctionSource = getSource(
  "modifyAuction.graphql",
  ResolverType.bids
);
