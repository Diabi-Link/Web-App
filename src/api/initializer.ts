import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { useAuthToken } from '../helpers/localstorage/auth';

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

export const useApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const { authToken } = useAuthToken();
  return new ApolloClient({
    link: authLink(authToken).concat(httpLink),
    cache: new InMemoryCache(),
  });
};
