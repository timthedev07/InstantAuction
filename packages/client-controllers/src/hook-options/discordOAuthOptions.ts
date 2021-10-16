import { MeDocument, MeQuery, DiscordOAuthMutationOptions, DiscordOAuthMutationVariables} from "../generated/graphql"

export const createDiscordOAuthOptions = (
  variables: DiscordOAuthMutationVariables
): DiscordOAuthMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data?.discordOAuth) return;
      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          __typename: "Query",
          me: data.discordOAuth.user,
        },
      });
    },
  };
};
