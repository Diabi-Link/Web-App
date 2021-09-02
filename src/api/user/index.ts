import { gql, QueryHookOptions, useLazyQuery } from '@apollo/client';

import { UserType } from '../../types/user';

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
  return useLazyQuery<FetchUserResponse, FetchUserData>(FETCH_USER, options);
}
