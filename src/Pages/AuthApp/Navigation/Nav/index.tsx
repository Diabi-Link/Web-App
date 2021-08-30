import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from '../../../../ui/Loader';
import NavigationWrapper from '../NavigationWrapper';

const Home = lazy(() => import('../../Home'));

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
          <Route path="/user" exact render={() => <>User Page</>} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </NavigationWrapper>
  );
};

export default Nav;
