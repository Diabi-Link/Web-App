import {
  ApolloClient,
  // split,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from '@apollo/client';
// import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { createClient } from 'graphql-ws';

import { useAuthToken } from '../hooks/useAuthToken';

const httpLink = new HttpLink({
  uri: 'https://diabilink.herokuapp.com/graphql/',
});

// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: 'ws://diabilink.herokuapp.com/subscriptions',
//   }),
// );

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );

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
