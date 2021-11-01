import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout";
import { ApolloProvider } from "@apollo/client";
import { client } from "client-controllers";
import { createTheme, ThemeProvider } from "@material-ui/core";

const App = ({ Component, pageProps }: AppProps) => {
  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
