import React, { lazy, Suspense } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { RegisterProvider } from '../Register/RegisterContext';
import Page404 from '../404';

import Navbar from '../Navbar';

const Home = lazy(() => import('../Home'));
const Register = lazy(() => import('../Register'));

const Nav = (): JSX.Element => {
  const location = useLocation();

  const locationsWithNavbar = ['/', '/404'];
  const needNavbar = locationsWithNavbar.includes(location.pathname);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {needNavbar && <Navbar />}
      <Switch>
        <Route path="/" exact component={Home} />
        <RegisterProvider>
          <Route path="/register" component={Register} />
        </RegisterProvider>
        <Route component={Page404} />
      </Switch>
    </Suspense>
  );
};

export default Nav;
