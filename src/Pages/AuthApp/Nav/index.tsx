import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from '../../../ui/Loader';

const Home = lazy(() => import('../Home'));

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Nav = (): JSX.Element => {
  return (
    <Suspense
      fallback={
        <Wrapper>
          <Loader size={14} />
        </Wrapper>
      }
    >
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};

export default Nav;
