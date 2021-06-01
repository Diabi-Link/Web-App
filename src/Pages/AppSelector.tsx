import React, { useContext } from 'react';

import { UserContext } from '../contexts/UserContext';

import AuthNav from './AuthApp/Nav';
import StaticNav from './StaticApp/Nav';

const AppSelector = (): React.ReactElement => {
  const {
    state: { user },
  } = useContext(UserContext);

  return user ? <AuthNav /> : <StaticNav />;
};

export default AppSelector;
