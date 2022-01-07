import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout";
import { IconContext } from "@react-icons/all-files/lib";
import { ChakraProvider } from "@chakra-ui/react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <IconContext.Provider value={{ color: "", size: "30px" }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </IconContext.Provider>
    </ChakraProvider>
  );
};

export default App;
