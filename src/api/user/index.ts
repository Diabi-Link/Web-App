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

type UpdateEmailResponse = {
  updateEmail: UserType;
};

type UpdateEmailData = {
  email: string;
};

const UPDATE_EMAIL = gql`
  mutation updateEmail($email: String!) {
    updateEmail(Email: $email) {
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
  options?: MutationHookOptions<UpdateEmailResponse, UpdateEmailData>,
) {
  return useAPIMutation(UPDATE_EMAIL, options);
}

type UpdateFirstnameResponse = {
  updateFirstname: UserType;
};

type UpdateFirstnameData = {
  firstName: string;
};

const UPDATE_FIRSTNAME = gql`
  mutation updateFirstname($firstName: String!) {
    updateFirstname(Firstname: $firstName) {
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
  options?: MutationHookOptions<UpdateFirstnameResponse, UpdateFirstnameData>,
) {
  return useAPIMutation(UPDATE_FIRSTNAME, options);
}

type UpdateLastnameResponse = {
  updateLastname: UserType;
};

type UpdateLastnameData = {
  lastName: string;
};

const UPDATE_LASTNAME = gql`
  mutation updateLastname($lastName: String!) {
    updateLastname(Lastname: $lastName) {
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
  options?: MutationHookOptions<UpdateLastnameResponse, UpdateLastnameData>,
) {
  return useAPIMutation(UPDATE_LASTNAME, options);
}

type UpdateBirthdayResponse = {
  updateBirthday: UserType;
};

type UpdateBirthdayData = {
  birthDate: Date;
};

const UPDATE_BIRTHDAY = gql`
  mutation updateBirthday($birthDate: DateTime!) {
    updateBirthday(Birthdate: $birthDate) {
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
  options?: MutationHookOptions<UpdateBirthdayResponse, UpdateBirthdayData>,
) {
  return useAPIMutation(UPDATE_BIRTHDAY, options);
}
