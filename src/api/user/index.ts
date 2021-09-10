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
    }
  }
`;

export function useFetchUserLazyQuery(
  options?: QueryHookOptions<UserResponse, FetchUserData>,
) {
  return useAPILazyQuery(FETCH_USER, options);
}

type UpdateEmailData = {
  email: string;
};

const UPDATE_EMAIL = gql`
  mutation User($email: String!) {
    User(Email: $email) {
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

export function useUpdateEmail(
  options?: MutationHookOptions<UserResponse, UpdateEmailData>,
) {
  return useAPIMutation(UPDATE_EMAIL, options);
}

type UpdateFirstnameData = {
  firstname: string;
};

const UPDATE_FIRSTNAME = gql`
  mutation User($firstname: String!) {
    User(Firstname: $firstname) {
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

export function useUpdateFirstname(
  options?: MutationHookOptions<UserResponse, UpdateFirstnameData>,
) {
  return useAPIMutation(UPDATE_FIRSTNAME, options);
}

type UpdateLastnameData = {
  lastname: string;
};

const UPDATE_LASTNAME = gql`
  mutation User($lastname: String!) {
    User(Lastname: $lastname) {
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

export function useUpdateLastname(
  options?: MutationHookOptions<UserResponse, UpdateLastnameData>,
) {
  return useAPIMutation(UPDATE_LASTNAME, options);
}

type UpdateBirthdayData = {
  lastname: string;
};

const UPDATE_BIRTHDAY = gql`
  mutation User($birthdate: DateTime!) {
    User(Birthdate: $birthdate) {
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

export function useUpdateBirthday(
  options?: MutationHookOptions<UserResponse, UpdateBirthdayData>,
) {
  return useAPIMutation(UPDATE_BIRTHDAY, options);
}
