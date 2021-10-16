import { MeQuery, MeDocument, DeleteAccountMutationOptions } from "../generated/graphql";

export const deleteAccountOptions:
  | DeleteAccountMutationOptions
  | undefined = {
  update: (store, { data }) => {
    if (data?.deleteAccount === undefined) return;
    store.writeQuery<MeQuery>({
      query: MeDocument,
      data: {
        __typename: "Query",
        me: null,
      },
    });
  },
};
