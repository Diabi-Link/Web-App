/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { info as InfoIcon } from 'react-icons-kit/icomoon/info';
import { useAuthToken } from '../../../hooks/useAuthToken';

import { UserActionTypes, UserContext } from '../../../contexts/UserContext';
import { ContextActionTypes, MainContext } from '../../../contexts/MainContext';

import Button from '../../../ui/Button';

const Container = styled.div`
  height: 100vh;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p``;

const LogoutButton = styled(Button)`
  margin-top: 2rem;
`;

const Home = (): React.ReactElement => {
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);
  const { dispatch: altDispatch } = useContext(MainContext);
  const { removeAuthToken, setAuthToken } = useAuthToken();

  useEffect(() => {
    altDispatch({
      type: ContextActionTypes.SetNotice,
      payload: {
        label: 'Cette page est temporaire',
        icon: InfoIcon,
        noticeStyle: 'info',
        persistent: true,
        closeable: true,
        duration: 0,
      },
    });
  }, []);
  const logout = (): void => {
    removeAuthToken();
    dispatch({ type: UserActionTypes.EmptyUser });
  };

  const birthDate = user?.birthDate as Date;

  return (
    <Container>
      <Wrapper>
        <Text>
          {user?.firstName} {user?.lastName.toUpperCase()} est bien authentifié
          !
        </Text>
        <Text>Type de compte : {user?.account}</Text>
        <Text>
          Date de naissance :{' '}
          {`${birthDate.getFullYear()}-${birthDate.getMonth()}-${birthDate.getDay()}`}
        </Text>
        <LogoutButton
          label="Se déconnecter"
          btnStyle="primary"
          onClick={logout}
          data-testid="logout-button"
        />
        <LogoutButton
          label="Mettre un token invalide"
          btnStyle="primary"
          onClick={() => setAuthToken('test')}
          data-testid="logout-button"
        />
      </Wrapper>
    </Container>
  );
};

export default Home;
