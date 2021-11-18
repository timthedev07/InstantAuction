export const createAuctionSource = `
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

export const closeAuctionSource = `
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
  }
}


`;
