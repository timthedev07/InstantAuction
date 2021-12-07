import { client } from "client-controllers";
import { withApollo as createWithApollo } from "next-apollo";

export const withApollo = createWithApollo(client as any);
