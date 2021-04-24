import React from 'react';
import styled from 'styled-components';

import Navbar from '../Navbar';

const Container = styled.div`
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
      <Navbar />
      <Wrapper>HOME</Wrapper>
    </Container>
  );
};

export default Home;
