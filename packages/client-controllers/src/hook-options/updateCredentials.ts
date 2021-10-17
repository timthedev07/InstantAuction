import {
  MeQuery,
  MeDocument,
  UpdateCredentialsMutationVariables,
  UpdateCredentialsMutationOptions
} from "../generated/graphql";

export const createDeleteAccountOptions = (
  variables: UpdateCredentialsMutationVariables
): UpdateCredentialsMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data?.updateCredentials) return;
      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          __typename: "Query",
          me: data.updateCredentials
        }
      });
    }
  };
};
