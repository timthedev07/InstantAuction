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
 * @param gqlFilename Your graphql file name without extension e.g. allAuctions.graphql createBid
 * @returns
 */
export const getSource = (
  gqlFilename: string,
  resolverType: ResolverType,
  ext: string = ".graphql"
) => {
  const gqlFilePath = `../client-controllers/src/graphql/${resolverType}/${gqlFilename}${ext}`;
  return readFileSync(join(process.cwd(), gqlFilePath)).toString();
};

export const createAuctionSource = getSource(
  "createAuction",
  ResolverType.auctions
);

export const closeAuctionSource = getSource(
  "closeAuction",
  ResolverType.auctions
);

export const deleteAuctionSource = getSource(
  "deleteAuction",
  ResolverType.auctions
);

export const allAuctionsSource = getSource(
  "allAuctions",
  ResolverType.auctions
);

export const endAuctionSource = getSource("endAuction", ResolverType.auctions);

export const createBidSource = getSource("createBid", ResolverType.bids);

export const deleteBidSource = getSource("deleteBid", ResolverType.bids);

export const modifyAuctionSource = getSource(
  "modifyAuction",
  ResolverType.auctions
);
