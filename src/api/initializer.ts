import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';

import { useAuthToken } from '../hooks/useAuthToken';

const httpLink = new HttpLink({
  uri: 'https://backend-short-life-toke-nrgqpe.herokuapp.com/graphql/',
});

const authLink = (authToken: string | null) =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    };
  });

export const useAppApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const { authToken } = useAuthToken();
  return new ApolloClient({
    link: from([
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      new TokenRefreshLink({
        accessTokenField: 'accessToken',
        isTokenValidOrUndefined: () => {
          const token = localStorage.getItem('authToken');

          if (!token) {
            return true;
          }

          try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { exp } = jwtDecode(token);
            console.log(exp);
            if (2 >= 1) {
              return false;
            }
            return true;
          } catch {
            return false;
          }
        },
        fetchAccessToken: () => {
          const refreshToken = localStorage.getItem('refreshToken');

          return fetch(
            'https://backend-short-life-toke-nrgqpe.herokuapp.com/refreshToken',
            {
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify({ refreshToken }),
            },
          );
        },
        handleFetch: (accessToken) => {
          localStorage.setItem('authToken', JSON.stringify(accessToken));
        },
        handleError: (err) => {
          console.warn('Your refresh token is invalid. Try to relogin');
          console.error(err);
        },
      }),
      authLink(authToken),
      httpLink,
    ]),
    cache: new InMemoryCache(),
  });
};
