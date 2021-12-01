import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout";
import { ApolloProvider } from "@apollo/client";
import { client } from "client-controllers";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client as any}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

export default App;
