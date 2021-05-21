import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '../../../ui/Button';

import { UserActionTypes, UserContext } from '../../../contexts/UserContext';
import { useAuthToken } from '../../../hooks/useAuthToken';

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
  const { removeAuthToken } = useAuthToken();

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
        />
      </Wrapper>
    </Container>
  );
};

export default Home;
