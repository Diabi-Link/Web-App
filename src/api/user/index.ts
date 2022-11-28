import { gql, MutationHookOptions, LazyQueryHookOptions } from '@apollo/client';
import { DeepNonNullable } from '../../types/utilities';
import { ChatUserType } from '../../types/chat';

import { UserType } from '../../types/user';
import { useAPILazyQuery, useAPIMutation } from '../handlers';

type UserResponse = {
  Me: UserType & { contact: DeepNonNullable<ChatUserType>[] };
};

type FetchUserData = {
  id: number;
};

const FETCH_USER = gql`
  query Me {
    Me {
      id
      email
      firstName
      lastName
      password
      birthDate
      account
      phone
      picture
      isPaid
      expire
      ProductSub
      contact {
        firstName
        lastName
        account
        id
      }
    }
  }
`;

export function useFetchUserLazyQuery(
  options?: LazyQueryHookOptions<UserResponse, FetchUserData>,
) {
  return useAPILazyQuery(FETCH_USER, options);
}

type UpdateUserResponse = {
  UpdateUser: UserType;
};

type UpdateUserData = {
  userInfo: {
    email?: UserType['email'];
    firstName?: UserType['firstName'];
    lastName?: UserType['lastName'];
    birthDate?: UserType['birthDate'] | null;
    phone?: string;
    password?: string;
  };
};

const UPDATE_USER = gql`
  mutation UpdateUser($userInfo: UserInfo!) {
    UpdateUser(UserInfo: $userInfo) {
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

export function useUpdateUser(
  options?: MutationHookOptions<UpdateUserResponse, UpdateUserData>,
) {
  return useAPIMutation(UPDATE_USER, options);
}

type UpdatePictureData = {
  picture: File;
};

const UPLOAD_PICTURE = gql`
  mutation UploadPicture($picture: Upload!) {
    UploadPicture(picture: $picture)
  }
`;

export function useUpdatePicture(
  options?: MutationHookOptions<boolean, UpdatePictureData>,
) {
  return useAPIMutation(UPLOAD_PICTURE, options);
}

const REMOVE_PICTURE = gql`
  mutation RemoveProfilePicture {
    RemoveProfilePicture
  }
`;

export function useRemovePicture(options?: MutationHookOptions<boolean>) {
  return useAPIMutation(REMOVE_PICTURE, options);
}
