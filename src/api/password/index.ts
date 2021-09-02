import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
} from '@apollo/client';

import { UserType } from '../../types/user';

type PasswordRecoveryResponse = {
  PasswordRecovery: {
    scalar: boolean;
  };
};

type PasswordRecoveryData = {
  email: string;
};

const PASSWORD_RECOVERY = gql`
  query PasswordRecovery($email: String!) {
    PasswordRecovery(email: $email)
  }
`;

export function usePasswordRecoveryLazyQuery(
  options?: QueryHookOptions<PasswordRecoveryResponse, PasswordRecoveryData>,
) {
  return useLazyQuery<PasswordRecoveryResponse, PasswordRecoveryData>(
    PASSWORD_RECOVERY,
    options,
  );
}

type PasswordRecoveryLinkResponse = {
  PasswordRecoveryLink: UserType;
};

type PasswordRecoveryLinkData = {
  newPassword: string;
  secretId: string;
};

const PASSWORD_RECOVERY_LINK = gql`
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

export function usePasswordRecoveryLinkMutation(
  options?: MutationHookOptions<
    PasswordRecoveryLinkResponse,
    PasswordRecoveryLinkData
  >,
) {
  return useMutation<PasswordRecoveryLinkResponse, PasswordRecoveryLinkData>(
    PASSWORD_RECOVERY_LINK,
    options,
  );
}
