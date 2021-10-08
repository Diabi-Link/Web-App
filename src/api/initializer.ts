import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from,
  ApolloLink,
  Observable,
} from '@apollo/client';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import { useRefreshToken } from '../hooks/useRefreshToken';
import { useAuthToken } from '../hooks/useAuthToken';

const httpLink = new HttpLink({
  uri: 'https://backend-refresh-token-2te0wrpd.herokuapp.com/graphql/',
});

// const authLink = (authToken: string | null) =>
//   setContext((_, { headers }) => {
//     return {
//       headers: {
//         ...headers,
//         authorization: authToken ? `Bearer ${authToken}` : '',
//       },
//     };
//   });

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((op) => {
          const accessToken = localStorage.getItem('authToken');
          if (accessToken) {
            op.setContext({
              headers: {
                authorization: `Bearer ${accessToken.replace(/['"]+/g, '')}`,
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
    }),
);

export const useAppApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const { removeAuthToken, setAuthToken } = useAuthToken();
  const {
    removeRefreshToken,
    setRefreshToken,
    refreshToken: refreshTokenSend,
  } = useRefreshToken();
  return new ApolloClient({
    link: from([
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      new TokenRefreshLink<{ accessToken; refreshToken }>({
        accessTokenField: 'token',
        isTokenValidOrUndefined: () => {
          const token = localStorage.getItem('authToken');

          if (!token) {
            return true;
          }

          try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { exp } = jwtDecode(token);
            if (Date.now() >= exp * 1000) {
              return false;
            }
            return true;
          } catch {
            return false;
          }
        },
        fetchAccessToken: () => {
          return fetch(
            'https://backend-refresh-token-2te0wrpd.herokuapp.com/refreshToken',
            {
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify({ refreshToken: refreshTokenSend }),
            },
          );
        },
        handleFetch: (newTokens) => {
          const { accessToken, refreshToken } = newTokens;
          setAuthToken(accessToken);
          setRefreshToken(refreshToken);
        },
        handleError: () => {
          removeAuthToken();
          removeRefreshToken();
        },
      }),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      requestLink,
      httpLink,
    ]),
    cache: new InMemoryCache(),
  });
};
