import {
  DeleteAuctionMutationOptions,
  DeleteAuctionMutationVariables,
  AllAuctionsDocument,
  AllAuctionsQuery
} from "../generated/graphql";

export const createAuctionDeletionOptions = (
  variables: DeleteAuctionMutationVariables
): DeleteAuctionMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data || !data.deleteAuction) return;

      const auctionId = variables.auctionId;

      const cachedData = store.readQuery<AllAuctionsQuery>({
        query: AllAuctionsDocument
      });

      let count: number = 1;
      let auctions: any[] = [];

      if (
        cachedData &&
        cachedData.allAuctions &&
        cachedData.allAuctions.count
      ) {
        // if there are cached Auctions
        count = cachedData.allAuctions.count - 1;
        auctions = cachedData.allAuctions.auctions.filter(
          each => each.id !== auctionId
        );
      }

      store.writeQuery<AllAuctionsQuery>({
        query: AllAuctionsDocument,
        data: {
          allAuctions: {
            auctions,
            count,
            __typename: "AllAuctionsResponse"
          },
          __typename: "Query"
        }
      });
    }
  };
};
