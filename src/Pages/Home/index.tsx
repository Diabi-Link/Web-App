import React from 'react';
import styled from 'styled-components';

const Container = styled.main`
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Home = (): JSX.Element => {
  return (
    <Container>
      <Wrapper>HOME</Wrapper>
    </Container>
  );
};

export default Home;
