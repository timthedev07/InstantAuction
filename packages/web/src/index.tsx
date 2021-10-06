import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { App } from "./App";
import { generateApolloClient } from "./utils/clientGenerator";
import { BACKEND } from "./constants/apollo";
import "./tmp.css";

export const client = generateApolloClient(BACKEND);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
