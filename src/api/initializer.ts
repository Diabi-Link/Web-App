import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { onError } from '@apollo/client/link/error';
import { useContext } from 'react';
import { UserActionTypes, UserContext } from '../contexts/UserContext';
import { useAuthToken } from '../hooks/useAuthToken';

const httpLink = new HttpLink({
  uri: 'https://diabilink.herokuapp.com/graphql/',
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

const errorLink = onError(({ networkError }) => {
  const { removeAuthToken } = useAuthToken();
  const { dispatch } = useContext(UserContext);

  if (
    networkError &&
    'statusCode' in networkError &&
    networkError.statusCode === 401
  ) {
    removeAuthToken();
    dispatch({ type: UserActionTypes.EmptyUser });
  }
});

export const useAppApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const { authToken } = useAuthToken();
  return new ApolloClient({
    link: authLink(authToken).concat(httpLink).concat(errorLink),
    cache: new InMemoryCache(),
  });
};
