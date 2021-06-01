import { gql } from '@apollo/client';
import { DeepNonNullable } from '../../types/utilities';

import { RegisterType } from '../../types/register';
import { UserType } from '../../types/user';

// TODO/ find a way to link Typescript to Apollo Client

export type UserData = {
  password: string;
} & DeepNonNullable<RegisterType>;

export type SignUpResponse = {
  SignUp: UserType & { password: string };
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

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  Login: {
    accessToken: string;
    refreshToken: string;
  };
};

export const LOGIN = gql`
  mutation Login($loginData: LoginData!) {
    Login(loginData: $loginData) {
      accessToken
      refreshToken
    }
  }
`;
