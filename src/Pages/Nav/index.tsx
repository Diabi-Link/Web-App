import React, { lazy, Suspense } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { RegisterProvider } from '../Register/RegisterContext';
import Page404 from '../404';

import Navbar from '../Navbar';

const Home = lazy(() => import('../Home'));
const Register = lazy(() => import('../Register'));
const Login = lazy(() => import('../Login'));

const Nav = (): JSX.Element => {
  const location = useLocation();

  const locationsWithNavbar = ['/', '/404'];
  const needNavbar = locationsWithNavbar.includes(location.pathname);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {needNavbar && <Navbar />}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register">
          <RegisterProvider>
            <Register />
          </RegisterProvider>
        </Route>
        <Route path="/404" component={Page404} />
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  );
};

export default Nav;
