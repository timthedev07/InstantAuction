import { ApolloProvider, ApolloClient } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { BACKEND } from "shared";
import { isClient } from "../lib/isClient";
import { getWithExpiry } from "../lib/localStorageExpiration";
import { AuthProvider } from "./AuthContext";
import { Observable, ApolloLink, HttpLink } from "@apollo/client";
import { onError } from "apollo-link-error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { InMemoryCache } from "@apollo/client";
import { ApolloContextType } from "../types/types";
import { needAuthState } from "../lib/needAuthState";
import { useRouter } from "next/router";

export const SERVER_ID = isClient
  ? getWithExpiry(window.localStorage, "serverId")
  : -1;

const ApolloContext = React.createContext<ApolloContextType | null>(null);

export const useApollo = () => {
  return useContext(ApolloContext);
};

export const CustomApolloProvider: React.FC = ({ children }) => {
  // global states
  const [accessToken, setAccessToken] = useState<string | null>(() => null);
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useRouter();

  // use effect hooks
  useEffect(() => {
    fetch(`${BACKEND}/auth/refresh_token`, {
      credentials: "include",
      method: "POST",
    })
      .then(async (x) => {
        const { accessToken } = await x.json();
        setAccessToken(accessToken);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  });

  const generateApolloClient = (baseUrl: string) => {
    const cache = new InMemoryCache({});
    const requestLink = new ApolloLink(
      (operation, forward) =>
        new Observable((observer) => {
          let handle: any;
          Promise.resolve(operation)
            .then((operation) => {
              if (accessToken) {
                operation.setContext({
                  headers: {
                    authorization: `bearer ${accessToken}`,
                  },
                });
              }
            })
            .then(() => {
              handle = forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              });
            })
            .catch(observer.error.bind(observer));

          return () => {
            if (handle) handle.unsubscribe();
          };
        })
    );

    const client = new ApolloClient({
      link: ApolloLink.from([
        new TokenRefreshLink({
          accessTokenField: "accessToken",
          isTokenValidOrUndefined: () => {
            if (!accessToken) {
              return true;
            }

            try {
              const { exp } = jwtDecode<JwtPayload>(accessToken);
              if (Date.now() >= exp! * 1000) {
                return false;
              } else {
                return true;
              }
            } catch {
              return false;
            }
          },
          fetchAccessToken: () => {
            return fetch(`${baseUrl}/auth/refresh_token`, {
              method: "POST",
              credentials: "include",
            });
          },
          handleFetch: (accessToken) => {
            setAccessToken(accessToken);
          },
          handleError: (err) => {
            console.warn("Your refresh token is invalid. Try to relogin");
            console.error(err);
          },
        }),
        onError((_stuff) => {}) as any,
        requestLink,
        new HttpLink({
          uri: `${baseUrl}/graphql`,
          credentials: "include",
        }),
      ]),
      cache,
    });

    return client;
  };

  const shibe = generateApolloClient(BACKEND);
  const burrito = generateApolloClient(
    `${
      process.env.NODE_ENV === "development"
        ? `http://localhost:500${SERVER_ID - 1}`
        : `http://homework-manager-db${SERVER_ID - 1}.herokuapp.com`
    }`
  );

  const value = {
    accessToken,
    setAccessToken,
    shibe,
    burrito,
  };

  if (needAuthState(pathname) && accessToken === null && loading) {
    return <Loading />;
  }

  return (
    <>
      <ApolloProvider client={burrito}>
        <ApolloProvider client={shibe}>
          <ApolloContext.Provider value={value}>
            <AuthProvider>{children}</AuthProvider>
          </ApolloContext.Provider>
        </ApolloProvider>
      </ApolloProvider>
    </>
  );
};
