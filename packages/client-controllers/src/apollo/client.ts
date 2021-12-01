import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client";
import { BACKEND } from "../constants";
import { createUploadLink } from "apollo-upload-client";

const link = createUploadLink({
  uri: `${BACKEND}/graphql`,
  credentials: "include"
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  link: link as any,
  credentials: "include"
});
