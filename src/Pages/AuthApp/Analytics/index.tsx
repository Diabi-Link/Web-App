import React from 'react';
import styled from 'styled-components';
import HypoGraph from './HypoGraph';

const Analytics = (): JSX.Element => {
  return (
    <Container>
      <Wrapper>
        <HypoGraph />
      </Wrapper>
    </Container>
  );
};

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
  width: 80vw;
`;

export default Analytics;
