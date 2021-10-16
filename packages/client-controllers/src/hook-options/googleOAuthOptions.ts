import { MeDocument, MeQuery, GoogleOAuthMutationOptions, GoogleOAuthMutationVariables} from "../generated/graphql"

export const createGoogleOAuthOptions = (
  variables: GoogleOAuthMutationVariables
): GoogleOAuthMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data?.googleOAuth) return;
      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          __typename: "Query",
          me: data.googleOAuth.user,
        },
      });
    },
  };
};
