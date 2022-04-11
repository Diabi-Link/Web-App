import React, { lazy, Suspense, useState } from 'react';
import styled from 'styled-components';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import Loader from '../../../ui/Loader';
import { RegisterProvider } from '../../../contexts/RegisterContext';
import Page404 from '../404';

import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const Home = lazy(() => import('../Home'));
const Register = lazy(() => import('../Register'));
const Login = lazy(() => import('../Login'));
const ForgotPassword = lazy(() => import('../ForgotPassword'));

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Nav = (): JSX.Element => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const locationsWithNavbar = ['/', '/404'];
  const needNavbar = locationsWithNavbar.includes(location.pathname);

  return (
    <Suspense
      fallback={
        <Wrapper>
          <Loader size={14} />
        </Wrapper>
      }
    >
      {needNavbar && (
        <>
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <Navbar toggle={toggle} />
        </>
      )}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register">
          <RegisterProvider>
            <Register />
          </RegisterProvider>
        </Route>
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/404" component={Page404} />
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  );
};

export default Nav;
