import React, { useContext } from 'react';
import { PictureProvider } from '../contexts/PictureContext';

import { UserContext } from '../contexts/UserContext';

import AuthNav from './AuthApp/Navigation/Nav';
import StaticNav from './StaticApp/Nav';

const AppSelector = (): React.ReactElement => {
  const {
    state: { user },
  } = useContext(UserContext);

  return user ? (
    <PictureProvider>
      <AuthNav />
    </PictureProvider>
  ) : (
    <StaticNav />
  );
};

export default AppSelector;
