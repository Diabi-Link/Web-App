import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  from,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

import { useAuthToken } from '../hooks/useAuthToken';

const link = (createUploadLink({
  uri: 'https://diabilink.herokuapp.com/graphql/',
}) as unknown) as ApolloLink;

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
    link: from([authLink(authToken), link]),
    cache: new InMemoryCache(),
  });
};
