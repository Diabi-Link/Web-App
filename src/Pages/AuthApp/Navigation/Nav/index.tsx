import React, { lazy, Suspense /* , useEffect, useContext */ } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from '../../../../ui/Loader';
import NavigationWrapper from '../NavigationWrapper';
import { ChatProvider } from '../../../../contexts/ChatContext';
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
  // const {
  //   state: { user },
  // } = useContext(UserContext);
  // const { dispatch: altDispatch } = useContext(MainContext);
  // const [getAlerts] = useGetAlertsLazyQuery({
  //   fetchPolicy: 'network-only',
  //   notifyOnNetworkStatusChange: true,
  //   pollInterval: 500,
  //   onCompleted: (payload: any) => {
  //     const { getAlertHistory: alertsTab } = payload;

  //     console.log(alertsTab);

  //     console.log(
  //       (new Date().getTime() - new Date(alertsTab[0]?.timestamp).getTime()) /
  //         1000,
  //     );

  //     console.log(
  //       (new Date().getTime() - new Date(alertsTab[0]?.timestamp).getTime()) /
  //         1000 <
  //         10,
  //     );

  //     if (
  //       (new Date().getTime() - new Date(alertsTab[0]?.timestamp).getTime()) /
  //         1000 <
  //       10
  //     ) {
  //       altDispatch({
  //         type: ContextActionTypes.SetNotice,
  //         payload: {
  //           label: alertsTab[0]?.message,
  //           noticeStyle: 'success',
  //           persistent: false,
  //           closeable: true,
  //           duration: 5000,
  //         },
  //       });
  //     }
  //   },
  // });

  // useEffect(() => {
  //   getAlerts({
  //     variables: {
  //       from: new Date(pickDate('hours', 1)),
  //       to: new Date(pickDate('milliseconds', 0)),
  //       userID: parseFloat(user?.id.toString() || ''),
  //     },
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
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
            <Route path="/contacts" component={Contacts} />
            <Route path="/add-measurement" component={AddMeasurement} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/alerts" component={Alerts} />
            <Route path="/profile" component={Profile} />
            <Route path="/chat" exact component={Chat} />
            <Redirect to="/analytics" />
          </Switch>
        </Suspense>
      </NavigationWrapper>
    </ChatProvider>
  );
};

export default Nav;
