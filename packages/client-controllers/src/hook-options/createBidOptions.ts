import {
  // AllAuctionsDocument,
  // AllAuctionsQuery,
  CreateBidMutationOptions,
  CreateBidMutationVariables
} from "../generated/graphql";

export const createBidCreationOptions = (
  variables: CreateBidMutationVariables
): CreateBidMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data || !data.createBid) return;
      store;
      // store.writeQuery<AllAuctionsQuery>({
      //   query: AllAuctionsDocument,
      //   data: {
      //     allAuctions: {
      //       auctions: [],
      //       count: 3,
      //       __typename: "AuctionsResponse"
      //     },
      //     __typename: "Query"
      //   }
      // });
    }
  };
};
