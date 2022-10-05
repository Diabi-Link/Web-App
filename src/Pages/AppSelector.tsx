import { ErrorBoundary } from '@sentry/react';
import React, { useContext } from 'react';

import { UserContext } from '../contexts/UserContext';

import AuthNav from './AuthApp/Navigation/Nav';
import StaticNav from './StaticApp/Nav';

const AppSelector = (): React.ReactElement => {
  const {
    state: { user },
  } = useContext(UserContext);

  return user ? (
    <AuthNav />
  ) : (
    <ErrorBoundary fallback={<>Erreur détectée</>}>
      <StaticNav />
    </ErrorBoundary>
  );
};

export default AppSelector;
