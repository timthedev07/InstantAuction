import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BACKEND } from "../constants/servers";

export const client = new ApolloClient({
  uri: `${BACKEND}/graphql`,
  cache: new InMemoryCache(),
});
