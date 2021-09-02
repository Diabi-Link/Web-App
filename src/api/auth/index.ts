import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { DeepNonNullable } from '../../types/utilities';

import { RegisterType } from '../../types/register';
import { UserType } from '../../types/user';

type SignUpData = {
  userData: {
    password: string;
  } & DeepNonNullable<RegisterType>;
};

type SignUpResponse = {
  SignUp: UserType & { password: string };
};

const SIGN_UP = gql`
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

export function useSignUpMutation(
  options?: MutationHookOptions<SignUpResponse, SignUpData>,
) {
  return useMutation<SignUpResponse, SignUpData>(SIGN_UP, options);
}

type LoginData = {
  loginData: { email: string; password: string };
};

type LoginResponse = {
  Login: {
    accessToken: string;
    refreshToken: string;
  };
};

const LOGIN = gql`
  mutation Login($loginData: LoginData!) {
    Login(loginData: $loginData) {
      accessToken
      refreshToken
    }
  }
`;

export function useLoginMutation(
  options?: MutationHookOptions<LoginResponse, LoginData>,
) {
  return useMutation<LoginResponse, LoginData>(LOGIN, options);
}
