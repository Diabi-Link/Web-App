import React from 'react';
import styled from 'styled-components';
import HypoGraph from './HypoGraph';
import DailyGraph from './DailyGraph';
import TimeInTargetGraph from './TimeInTargetGraph';

const Analytics = (): JSX.Element => {
  return (
    <Container>
      <Wrapper>
        <TopWrapper>
          <TimeInTargetGraph />
          <HypoGraph />
        </TopWrapper>
        <BottomWrapper>
          <DailyGraph />
        </BottomWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100vw;
  height: 100vh;

  @media (min-width: 1024px) and (orientation: landscape) {
    justify-content: center;
    width: 80vw;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 10px;

  & > div {
    margin: 10px;
  }

  // @media (min-width: 768px) and (orientation: portrait) {
  //   width: 60vw;
  // }

  // @media (min-width: 768px) and (orientation: landscape) {
  //   width: 50%;
  //   height: auto;
  // }

  @media (min-width: 1024px) and (orientation: landscape) {
    flex-direction: row;
    & > div {
      margin: 5px;
    }
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export default Analytics;
