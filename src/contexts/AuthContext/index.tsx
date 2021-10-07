import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode';
import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';
import { useAuthToken } from '../../hooks/useAuthToken';
import { UserType } from '../../types/user';

import Loader from '../../ui/Loader';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const AuthContext = React.createContext<{ user: UserType | null }>({
  user: null,
});

type Props = {
  children: React.ReactElement;
};

const FETCH_USER = gql`
  query User($id: Float!) {
    User(ID: $id) {
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

const AuthProvider = ({ children }: Props): React.ReactElement => {
  const [user, setUser] = useState<UserType | null>(null);
  const [waitingToGetUserData, setWaitingToGetUserData] = useState(true);
  const [skip, setSkip] = React.useState(false);

  const { authToken, removeAuthToken } = useAuthToken();

  const [decrypted, setDecrypted] = useState<{ userId: number }>({
    userId: -1,
  });

  const { loading, data } = useQuery(FETCH_USER, {
    skip: skip || decrypted.userId === -1,
    variables: { id: decrypted.userId },
    onCompleted: (payload) => {
      setUser(payload.User);
      setWaitingToGetUserData(false);
    },
    onError: () => {
      setWaitingToGetUserData(false);
    },
  });

  useEffect(() => {
    try {
      if (authToken) {
        setDecrypted(jwt(authToken));
      } else {
        setWaitingToGetUserData(false);
      }
    } catch {
      removeAuthToken();
      setWaitingToGetUserData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // check whether data exists
    if (!loading && !!data) {
      setSkip(true);
    }
  }, [data, loading]);

  if (waitingToGetUserData) {
    return (
      <Wrapper>
        <Loader size={14} />
      </Wrapper>
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
