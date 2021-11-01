import {
  MeQuery,
  MeDocument,
  DeleteAccountMutationOptions,
  DeleteAccountMutationVariables
} from "../generated/graphql";

export const createDeleteAccountOptions = (
  variables: DeleteAccountMutationVariables
): DeleteAccountMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data || data.deleteAccount === undefined) return;
      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          __typename: "Query",
          me: null
        }
      });
    }
  };
};
