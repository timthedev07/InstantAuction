import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout";
import { IconContext } from "@react-icons/all-files/lib";
import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <IconContext.Provider value={{ color: "white", size: "30px" }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </IconContext.Provider>
    </ThemeProvider>
  );
};

export default App;
