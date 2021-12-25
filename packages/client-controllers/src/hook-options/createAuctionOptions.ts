import {
  CreateAuctionMutationOptions,
  CreateAuctionMutationVariables,
  AllAuctionsDocument,
  AllAuctionsQuery,
  AuctionsOwnedDocument,
  AuctionsOwnedQuery
} from "../generated/graphql";

export const createAuctionCreationOptions = (
  variables: CreateAuctionMutationVariables
): CreateAuctionMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data || !data.createAuction) return;

      const cachedData = {
        all: store.readQuery<AllAuctionsQuery>({
          query: AllAuctionsDocument
        }),
        owned: store.readQuery<AuctionsOwnedQuery>({
          query: AuctionsOwnedDocument
        })
      };

      let count = {
        all: 1,
        owned: 1
      };
      let auctions = {
        all: [data.createAuction],
        owned: [data.createAuction]
      };

      if (
        cachedData.all &&
        cachedData.all.allAuctions &&
        cachedData.all.allAuctions.count
      ) {
        // if there are cached items
        count.all = cachedData.all.allAuctions.count + 1;
        auctions.all = [
          ...cachedData.all.allAuctions.auctions,
          data.createAuction
        ];
      }
      if (
        cachedData.owned &&
        cachedData.owned.auctionsOwned &&
        cachedData.owned.auctionsOwned.count
      ) {
        // if there are cached items
        count.owned = cachedData.owned.auctionsOwned.count + 1;
        auctions.owned = [
          ...cachedData.owned.auctionsOwned.auctions,
          data.createAuction
        ];
      }

      store.writeQuery<AllAuctionsQuery>({
        query: AllAuctionsDocument,
        data: {
          allAuctions: {
            auctions: auctions.all,
            count: count.all
          },
          __typename: "Query"
        }
      });

      store.writeQuery<AuctionsOwnedQuery>({
        query: AuctionsOwnedDocument,
        data: {
          auctionsOwned: {
            auctions: auctions.owned,
            count: count.owned
          },
          __typename: "Query"
        }
      });
    }
  };
};
