import { gql } from '@apollo/client';

import { UserType } from '../../types/user';

export type PasswordRecoveryResponse = {
  PasswordRecovery: {
    scalar: boolean;
  };
};

export const PASSWORD_RECOVERY = gql`
  query PasswordRecovery($email: String!) {
    PasswordRecovery(email: $email)
  }
`;

export type PasswordRecoveryLinkResponse = {
  PasswordRecoveryLink: UserType;
};

export const PASSWORD_RECOVERY_LINK = gql`
  mutation PasswordRecoveryLink($newPassword: String!, $secretId: String!) {
    PasswordRecoveryLink(newPassword: $newPassword, secretId: $secretId) {
      id
      email
      firstName
      lastName
      birthDate
      password
      account
    }
  }
`;
