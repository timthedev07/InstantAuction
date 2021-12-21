import {
  DeleteAuctionMutationOptions,
  DeleteAuctionMutationVariables,
  AllAuctionsDocument,
  AllAuctionsQuery,
  AuctionsOwnedQuery,
  AuctionsOwnedDocument
} from "../generated/graphql";

export const createAuctionDeletionOptions = (
  variables: DeleteAuctionMutationVariables
): DeleteAuctionMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data || !data.deleteAuction) return;

      const auctionId = variables.auctionId;

      const cachedData = {
        all: store.readQuery<AllAuctionsQuery>({
          query: AllAuctionsDocument
        }),
        owned: store.readQuery<AuctionsOwnedQuery>({
          query: AuctionsOwnedDocument
        })
      };

      let count = {
        all: 0,
        owned: 0
      };
      let auctions = {
        all: [] as any[],
        owned: [] as any[]
      };

      if (
        cachedData.all &&
        cachedData.all.allAuctions &&
        cachedData.all.allAuctions.count
      ) {
        // if there are cached Auctions
        count.all = cachedData.all.allAuctions.count - 1;
        auctions.all = cachedData.all.allAuctions.auctions.filter(
          each => each.id !== auctionId
        );
      }

      if (
        cachedData.owned &&
        cachedData.owned.auctionsOwned &&
        cachedData.owned.auctionsOwned.count
      ) {
        // if there are cached Auctions
        count.all = cachedData.owned.auctionsOwned.count - 1;
        auctions.all = cachedData.owned.auctionsOwned.auctions.filter(
          each => each.id !== auctionId
        );
      }

      store.writeQuery<AuctionsOwnedQuery>({
        query: AuctionsOwnedDocument,
        data: {
          auctionsOwned: {
            auctions: auctions.owned,
            count: count.owned,
            __typename: "AuctionsResponse"
          },
          __typename: "Query"
        }
      });
      store.writeQuery<AllAuctionsQuery>({
        query: AllAuctionsDocument,
        data: {
          allAuctions: {
            auctions: auctions.all,
            count: count.all,
            __typename: "AuctionsResponse"
          },
          __typename: "Query"
        }
      });
    }
  };
};
