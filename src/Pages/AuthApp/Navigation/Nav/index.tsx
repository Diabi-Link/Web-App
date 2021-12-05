import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from '../../../../ui/Loader';
import NavigationWrapper from '../NavigationWrapper';
import TimeInTargetGraph from '../../Analytics/TimeInTargetGraph';
import DailyGraph from '../../Analytics/DailyGraph';

const Home = lazy(() => import('../../Home'));
const Profile = lazy(() => import('../../Profile'));
const AddMeasurement = lazy(() => import('../../AddMeasurement'));
const Analytics = lazy(() => import('../../Analytics'));

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Nav = (): JSX.Element => {
  return (
    <NavigationWrapper>
      <Suspense
        fallback={
          <Wrapper>
            <Loader size={14} />
          </Wrapper>
        }
      >
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add-measurement" exact component={AddMeasurement} />
          <Route path="/analytics" exact component={Analytics} />
          <Route path="/profile" exact component={Profile} />
          <Route
            path="/time"
            exact
            render={() => (
              <Container>
                <Wrapper2>
                  <TimeInTargetGraph />
                </Wrapper2>
              </Container>
            )}
          />
          <Route
            path="/daily"
            exact
            render={() => (
              <Container>
                <Wrapper2>
                  <DailyGraph />
                </Wrapper2>
              </Container>
            )}
          />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </NavigationWrapper>
  );
};

const Container = styled.div`
  height: 100vh;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
`;

export default Nav;
