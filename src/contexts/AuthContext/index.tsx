import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode';
import styled from 'styled-components';

import { useAuthToken } from '../../hooks/useAuthToken';
import { UserType } from '../../types/user';

import Loader from '../../ui/Loader';
import { useFetchUserLazyQuery } from '../../api';

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

const AuthProvider = ({ children }: Props): React.ReactElement => {
  const [user, setUser] = useState<UserType | null>(null);
  const [waitingToGetUserData, setWaitingToGetUserData] = useState(true);

  const { authToken, removeAuthToken } = useAuthToken();

  const [fetchUser] = useFetchUserLazyQuery({
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
        const decrypted: { userId: number } = jwt(authToken);
        fetchUser({ variables: { id: decrypted.userId } });
      } else {
        setWaitingToGetUserData(false);
      }
    } catch {
      removeAuthToken();
      setWaitingToGetUserData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
