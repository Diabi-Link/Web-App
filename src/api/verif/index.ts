import { gql, MutationHookOptions } from '@apollo/client';
import { useAPIMutation } from '../handlers';

type VerifEmailResponse = {
  VerifEmail: {};
};

type VerifEmailData = {
  email: string;
};

const VERIF_EMAIL = gql`
  mutation VerifEmail($email: String!) {
    VerifEmail(email: $email)
  }
`;

export function useVerifEmail(
  options?: MutationHookOptions<VerifEmailResponse, VerifEmailData>,
) {
  return useAPIMutation(VERIF_EMAIL, options);
}

type VerifEmailLinkResponse = {
  VerifEmailLink: {};
};

type VerifEmailLinkData = {
  email: string;
  secretId: string;
};

const VERIF_EMAIL_LINK = gql`
  mutation VerifEmailLink($email: String!, $secretId: String!) {
    VerifEmailLink(email: $email, secretId: $secretId)
  }
`;

export function useVerifEmailLink(
  options?: MutationHookOptions<VerifEmailLinkResponse, VerifEmailLinkData>,
) {
  return useAPIMutation(VERIF_EMAIL_LINK, options);
}
