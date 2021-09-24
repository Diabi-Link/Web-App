import { gql, MutationHookOptions, QueryHookOptions } from '@apollo/client';

import { UserType } from '../../types/user';
import { useAPILazyQuery, useAPIMutation } from '../handlers';

type UserResponse = {
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
      phone
    }
  }
`;

export function useFetchUserLazyQuery(
  options?: QueryHookOptions<UserResponse, FetchUserData>,
) {
  return useAPILazyQuery(FETCH_USER, options);
}

type UpdateUserResponse = {
  UpdateUser: UserType;
};

type UpdateUserData = {
  userInfo: {
    email?: UserType['email'];
    firstName?: UserType['firstName'];
    lastName?: UserType['lastName'];
    birthDate?: UserType['birthDate'] | null;
    phone?: string;
    password?: string;
  };
};

const UPDATE_USER = gql`
  mutation UpdateUser($userInfo: UserInfo!) {
    UpdateUser(UserInfo: $userInfo) {
      id
      email
      firstName
      lastName
      password
      birthDate
      account
      phone
    }
  }
`;

export function useUpdateUser(
  options?: MutationHookOptions<UpdateUserResponse, UpdateUserData>,
) {
  return useAPIMutation(UPDATE_USER, options);
}
