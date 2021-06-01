import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { useAuthToken } from '../hooks/useAuthToken';

const httpLink = createHttpLink({
  uri: 'https://diabilink.herokuapp.com/graphql/',
});

const authLink = (authToken: string | null): ApolloLink =>
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
    link: authLink(authToken).concat(httpLink),
    cache: new InMemoryCache(),
  });
};
