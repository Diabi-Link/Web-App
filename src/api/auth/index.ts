import { gql } from '@apollo/client';

export type UserData = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  role: string;
};

export const SIGN_UP = gql`
  mutation SignUp(
    $email: String!
    $firstname: String!
    $lastname: String!
    $password: String!
    $role: String!
  ) {
    SignUp(
      UserData: {
        email: $email
        firstname: $firstname
        lastname: $lastname
        password: $password
        role: $role
      }
    ) {
      id
      email
      firstname
      lastname
      password
      role
    }
  }
`;
