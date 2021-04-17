import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Register = lazy(() => import('../Register'));

const Nav = (): JSX.Element => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" exact />
        <Route path="/register" component={Register} />
      </Switch>
    </Suspense>
  );
};

export default Nav;
