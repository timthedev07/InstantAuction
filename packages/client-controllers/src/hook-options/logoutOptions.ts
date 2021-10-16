import { MeQuery, MeDocument, LogoutMutationOptions } from "../generated/graphql";

export const logoutOptions:
  | LogoutMutationOptions
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
