import { readFileSync } from "fs";
import { join } from "path";

type ResolverType = "auctions" | "bids" | "items" | "users";
/**
 *
 * @param gqlFileShortPath e.g. auctions/allAuctions.graphql, bids/createBid.graphql
 * @returns
 */
export const getSource = () => {
  const gqlFilePath = `../client-controllers/src/graphql/${gqlFilename}`;
  return readFileSync(join(process.cwd(), gqlFilePath)).toString();
};

export const createAuctionSource = getSource("auctions/createAuction.graphql");

export const closeAuctionSource = getSource("auctions/closeAuction.graphql");

export const deleteAuctionSource = `
mutation DeleteAuction($auctionId: Int!) {
  deleteAuction(auctionId: $auctionId)
}
`;

export const allAuctionsSource = `
query AllAuctions {
  allAuctions {
    count
    auctions {
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
}
`;

export const endAuctionSource = `
mutation EndAuction($auctionId: Int!, $winningBidId: Int!) {
  endAuction(auctionId: $auctionId, winningBidId: $winningBidId) {
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
    winner {
      username
    }
  }
}


`;

export const createBidSource = `
mutation CreateBid($itemId: Int!, $auctionId: Int!) {
  createBid(itemId: $itemId, auctionId: $auctionId) {
    id
    bidder {
      username
    }
    item {
      id
      picture
      name
    }
    won
  }
}
`;
