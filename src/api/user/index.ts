import { gql } from '@apollo/client';

import { UserType } from '../../types/user';

// TODO/ find a way to link Typescript to Apollo Client

export type FetchUserResponse = {
  User: UserType;
};

export const FETCH_USER = gql`
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
