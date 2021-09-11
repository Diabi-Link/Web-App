import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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

export const useAppApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const { authToken } = useAuthToken();
  return new ApolloClient({
    link: from([authLink(authToken), httpLink]),
    cache: new InMemoryCache(),
  });
};
