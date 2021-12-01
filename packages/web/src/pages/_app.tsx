import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout";
import { ApolloProvider } from "@apollo/client";
import { client } from "client-controllers";
import { IconContext } from "react-icons/lib";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <IconContext.Provider value={{ color: "white", size: "30px" }}>
      <ApolloProvider client={client as any}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </IconContext.Provider>
  );
};

export default App;
