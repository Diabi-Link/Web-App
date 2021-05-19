import { gql } from '@apollo/client';
import { DeepNonNullable } from '../../types/utilities';

import { UserType } from '../../contexts/RegisterContext';

export type UserData = {
  password: string;
} & DeepNonNullable<UserType>;

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
