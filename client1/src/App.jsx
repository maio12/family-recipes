import "./index.scss";
import React from "react";
import AppRoutes from "./routes/routes";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { GlobalProvider } from "./context/GlobalState";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN } from "./constants/constants";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//apollo client setup
const client = new ApolloClient({
  link: authLink.concat(httpLink), //the supercharged endpoint that we make requests to
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalProvider>
        <AppRoutes />
      </GlobalProvider>
    </ApolloProvider>
  );
};

export default App;
