import { gql, MutationHookOptions, QueryHookOptions } from '@apollo/client';
import { UserType } from '../../types/user';
import { useAPIMutation, useAPIQuery } from '../handlers';

type UserResponse = {
  Me: {
    contact: [UserType];
  };
};

export const GET_CONTACT = gql`
  query Me {
    Me {
      contact {
        id
        email
        firstName
        lastName
        birthDate
        account
      }
    }
  }
`;

export function useGetContact(options?: QueryHookOptions<UserResponse>) {
  return useAPIQuery(GET_CONTACT, options);
}

type DeleteContactResponse = {
  DeleteContact: UserType;
};

type DeleteContactData = {
  id: [
    {
      id: number;
    },
  ];
};

const DELETE_CONTACT = gql`
  mutation DeleteContact($id: [ContactInput!]!) {
    DeleteContact(id: $id) {
      id
    }
  }
`;

export function useDeleteContact(
  options?: MutationHookOptions<DeleteContactResponse, DeleteContactData>,
) {
  return useAPIMutation(DELETE_CONTACT, options);
}

type AddContactResponse = {
  AddContact: UserType;
};

type AddContactData = {
  email: String;
};

const ADD_CONTACT = gql`
  mutation AddContact($email: String!) {
    AddContact(email: $email) {
      id
      email
      firstName
      lastName
      password
      birthDate
      account
      phone
    }
  }
`;

export function useAddContact(
  options?: MutationHookOptions<AddContactResponse, AddContactData>,
) {
  return useAPIMutation(ADD_CONTACT, options);
}
