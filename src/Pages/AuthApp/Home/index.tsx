import React, { useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../../../contexts/UserContext';

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

const Home = (): React.ReactElement => {
  const {
    state: { user },
  } = useContext(UserContext);

  return (
    <Container data-testid="auth-home-page">
      <Wrapper>
        <Text>
          Bienvenue sur DiabiLink {user?.firstName}{' '}
          {user?.lastName.toUpperCase()} !
        </Text>
        <Text>Type de compte : {user?.account}</Text>
      </Wrapper>
    </Container>
  );
};

export default Home;
