import {
  MutationFunctionOptions,
  DefaultContext,
  ApolloCache,
} from "@apollo/client";
import { LogoutMutation, Exact, MeQuery, MeDocument } from "../generated/graphql";

export const logoutOptions:
  | MutationFunctionOptions<
      LogoutMutation,
      Exact<{
        [key: string]: never;
      }>,
      DefaultContext,
      ApolloCache<any>
    >
  | undefined = {
  update: (store, { data }) => {
    if (!data?.logout) return;
    store.writeQuery<MeQuery>({
      query: MeDocument,
      data: {
        __typename: "Query",
        me: null,
      },
    });
  },
};
