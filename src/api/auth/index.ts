import { gql } from '@apollo/client';
import { DeepNonNullable } from '../../types/utilities';

import { RegisterType } from '../../types/register';
import { UserType } from '../../types/user';

// TODO/ find a way to link Typescript to Apollo Client

export type UserData = {
  password: string;
} & DeepNonNullable<RegisterType>;

export type SignUpResponse = {
  SignUp: UserType;
};

export const SIGN_UP = gql`
  mutation SignUp($userData: UserData!) {
    SignUp(userData: $userData) {
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
