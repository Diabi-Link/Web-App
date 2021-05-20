import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode';

import { useLazyQuery } from '@apollo/client';
import { useAuthToken } from '../../hooks/useAuthToken';
import { UserType } from '../../types/user';

import Loader from '../../ui/Loader';
import { FetchUserResponse, FETCH_USER } from '../../api';

const AuthContext = React.createContext<{ user: UserType | null }>({
  user: null,
});

type Props = {
  children: React.ReactElement;
};

const AuthProvider = ({ children }: Props): React.ReactElement => {
  const [user, setUser] = useState<UserType | null>(null);
  const [waitingToGetUserData, setWaitingToGetUserData] = useState(true);

  const { authToken } = useAuthToken();

  const [fetchUser] = useLazyQuery<FetchUserResponse, { id: number }>(
    FETCH_USER,
    {
      onCompleted: (payload) => {
        setUser(payload.User);
        setWaitingToGetUserData(false);
      },
      onError: () => {
        setWaitingToGetUserData(false);
      },
    },
  );

  useEffect(() => {
    if (authToken) {
      const decrypted: { userId: number } = jwt(authToken);
      fetchUser({ variables: { id: decrypted.userId } });
    } else {
      setWaitingToGetUserData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (waitingToGetUserData) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
