import React, {
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../../ui/Loader';
import NavigationWrapper from '../NavigationWrapper';
import { ChatProvider } from '../../../../contexts/ChatContext';
import { useAuthToken } from '../../../../hooks/useAuthToken';
import { PictureContext } from '../../../../contexts/PictureContext';
import { UserContext } from '../../../../contexts/UserContext';

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
  const { authToken } = useAuthToken();
  const { setPicture, setPictureLoading } = useContext(PictureContext);

  const fetchPicture = useCallback(() => {
    return axios
      .create({
        baseURL: 'https://diabilink.herokuapp.com/',
        headers: {
          authorization: `Bearer ${authToken}`,
          'Access-Control-Allow-Origin': '*',
          Accept: `application/json, image/png;`,
        },
      })
      .get('getPicture', {
        responseType: 'blob',
      });
  }, [authToken]);

  const savePicture = useCallback(async () => {
    try {
      const { data } = await fetchPicture();
      if (!(data instanceof Blob && data.type === 'application/json')) {
        setPicture(URL.createObjectURL(data));
      } else {
        setPictureLoading(false);
      }
    } catch {
      // eslint-disable-next-line no-console
      console.error('error when fetching picture');
      setPictureLoading(false);
    }
  }, [fetchPicture, setPicture, setPictureLoading]);

  useEffect(() => {
    if (authToken) {
      try {
        savePicture();
      } catch {
        // eslint-disable-next-line no-console
        console.error('error when fetching picture');
      }
    }
  }, [authToken, savePicture]);
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
            {user?.isPaid ? (
              <>
                <Route path="/contacts" component={Contacts} />
                <Route path="/add-measurement" component={AddMeasurement} />
                <Route path="/analytics" component={Analytics} />
                <Route path="/alerts" component={Alerts} />
                <Route path="/chat" exact component={Chat} />
                <Route path="/profile" component={Profile} />
                <Redirect to="/analytics" />
              </>
            ) : (
              <>
                <Route path="/profile" component={Profile} />
                <Redirect to="/profile" />
              </>
            )}

            <Redirect to={user?.isPaid ? '/analytics' : '/profile'} />
          </Switch>
        </Suspense>
      </NavigationWrapper>
    </ChatProvider>
  );
};

export default Nav;
