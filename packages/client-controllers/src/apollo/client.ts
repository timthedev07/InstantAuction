import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BACKEND } from "shared";

export const client = new ApolloClient({
  uri: `${BACKEND}/graphql`,
  cache: new InMemoryCache(),
});
