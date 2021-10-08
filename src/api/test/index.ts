import { QueryHookOptions, gql } from '@apollo/client';
import { useAPILazyQuery } from '../handlers';

const NO_MESSAGE = gql`
  query noMessage {
    noMessage
  }
`;

export function useNoMessageLazyQuery(options?: QueryHookOptions) {
  return useAPILazyQuery(NO_MESSAGE, options);
}
