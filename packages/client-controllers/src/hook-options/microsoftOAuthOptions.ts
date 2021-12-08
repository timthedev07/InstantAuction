import {
  MeDocument,
  MeQuery,
  MicrosoftOAuthMutationOptions,
  MicrosoftOAuthMutationVariables
} from "../generated/graphql";

export const createMicrosoftOAuthOptions = (
  variables: MicrosoftOAuthMutationVariables
): MicrosoftOAuthMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data || !data.microsoftOAuth) return;
      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          __typename: "Query",
          me: data.microsoftOAuth.user
        }
      });
    }
  };
};
