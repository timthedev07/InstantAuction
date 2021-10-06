import { ApolloClient, Observable, ApolloLink, HttpLink } from "@apollo/client";
import { getAccessToken, setAccessToken } from "../accessToken";
import { onError } from "apollo-link-error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({});

export const generateApolloClient = (baseUrl: string) => {
  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle: any;
        Promise.resolve(operation)
          .then((operation) => {
            const accessToken = getAccessToken();
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
          const token = getAccessToken();

          if (!token) {
            return true;
          }

          try {
            const { exp } = jwtDecode<JwtPayload>(token);
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
      onError(({ graphQLErrors, networkError }) => {}) as any,
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
