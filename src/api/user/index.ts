import { gql, QueryHookOptions } from '@apollo/client';

import { UserType } from '../../types/user';
import { useAPILazyQuery } from '../handlers';

type FetchUserResponse = {
  User: UserType;
};

type FetchUserData = {
  id: number;
};

const FETCH_USER = gql`
  query User($id: Float!) {
    User(ID: $id) {
      id
      email
      firstName
      lastName
      password
      birthDate
      account
    }
  }
`;

export function useFetchUserLazyQuery(
  options?: QueryHookOptions<FetchUserResponse, FetchUserData>,
) {
  return useAPILazyQuery(FETCH_USER, options);
}
