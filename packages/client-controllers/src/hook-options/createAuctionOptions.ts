import {
  CreateAuctionMutationOptions,
  CreateAuctionMutationVariables,
  AllAuctionsDocument,
  AllAuctionsQuery
} from "../generated/graphql";

export const createAuctionCreationOptions = (
  variables: CreateAuctionMutationVariables
): CreateAuctionMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data || !data.createAuction) return;

      const cachedData = store.readQuery<AllAuctionsQuery>({
        query: AllAuctionsDocument
      });

      let count: number = 1;
      let auctions = [data.createAuction];

      if (
        cachedData &&
        cachedData.allAuctions &&
        cachedData.allAuctions.count
      ) {
        // if there are cached items
        count = cachedData.allAuctions.count + 1;
        auctions = [...cachedData.allAuctions.auctions, data.createAuction];
      }

      store.writeQuery<AllAuctionsQuery>({
        query: AllAuctionsDocument,
        data: {
          allAuctions: {
            auctions,
            count
          },
          __typename: "Query"
        }
      });
    }
  };
};
