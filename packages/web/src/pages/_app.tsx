// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BACKEND } from "shared";

const client = new ApolloClient({
  uri: BACKEND,
  cache: new InMemoryCache(),
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

export default App;
