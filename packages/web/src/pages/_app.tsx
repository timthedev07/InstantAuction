import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout";
import { IconContext } from "@react-icons/all-files/lib";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <IconContext.Provider value={{ color: "white", size: "30px" }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </IconContext.Provider>
  );
};

export default App;
