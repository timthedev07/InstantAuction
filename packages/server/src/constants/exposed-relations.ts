export const auctionExposedRelations = ["seller", "item", "winner"];
export const bidExposedRelations = [
  "bidder",
  "item",
  "item.owner",
  "auction",
  "auction.item",
];
