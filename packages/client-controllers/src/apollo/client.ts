import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { BACKEND } from "shared";

const link = createHttpLink({
  uri: `${BACKEND}/graphql`,
  credentials: "include",
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
