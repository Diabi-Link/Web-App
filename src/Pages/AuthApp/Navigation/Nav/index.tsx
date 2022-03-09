import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from '../../../../ui/Loader';
import NavigationWrapper from '../NavigationWrapper';

const Home = lazy(() => import('../../Home'));
const Contacts = lazy(() => import('../../Contacts'));
const Profile = lazy(() => import('../../Profile'));
const AddMeasurement = lazy(() => import('../../AddMeasurement'));
const Analytics = lazy(() => import('../../Analytics'));
const Alerts = lazy(() => import('../../Alerts'));

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
          <Route path="/contacts" component={Contacts} />
          <Route path="/add-measurement" component={AddMeasurement} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/alerts" component={Alerts} />
          <Route path="/profile" component={Profile} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </NavigationWrapper>
  );
};

export default Nav;
