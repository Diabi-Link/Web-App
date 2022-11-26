import React, { lazy, Suspense, useContext } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from '../../../../ui/Loader';
import NavigationWrapper from '../NavigationWrapper';
import { ChatProvider } from '../../../../contexts/ChatContext';
import { UserContext } from '../../../../contexts/UserContext';
// import { UserContext } from '../../../../contexts/UserContext';
// import {
//   ContextActionTypes,
//   MainContext,
// } from '../../../../contexts/MainContext';
// import { useGetAlertsLazyQuery } from '../../../../api';
// import { pickDate } from '../../../../utils';

// import { useGetNotif } from '../../../../api';

const Contacts = lazy(() => import('../../Contacts'));
const Profile = lazy(() => import('../../Profile'));
const AddMeasurement = lazy(() => import('../../AddMeasurement'));
const Analytics = lazy(() => import('../../Analytics'));
const Alerts = lazy(() => import('../../Alerts'));
const Chat = lazy(() => import('../../Chat'));

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Nav = (): JSX.Element => {
  const {
    state: { user },
  } = useContext(UserContext);

  return (
    <ChatProvider>
      <NavigationWrapper>
        <Suspense
          fallback={
            <Wrapper>
              <Loader size={14} />
            </Wrapper>
          }
        >
          <Switch>
            {user?.isPaid && (
              <>
                <Route path="/contacts" component={Contacts} />
                <Route path="/add-measurement" component={AddMeasurement} />
                <Route path="/analytics" component={Analytics} />
                <Route path="/alerts" component={Alerts} />
                <Route path="/chat" exact component={Chat} />
              </>
            )}
            <Route path="/profile" component={Profile} />
            <Redirect to={user?.isPaid ? '/analytics' : '/profile'} />
          </Switch>
        </Suspense>
      </NavigationWrapper>
    </ChatProvider>
  );
};

export default Nav;
