import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('../Home'));
const Register = lazy(() => import('../Register'));

const Nav = (): JSX.Element => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
      </Switch>
    </Suspense>
  );
};

export default Nav;
