import React, { useContext } from 'react';

import { UserContext } from '../contexts/UserContext';

import AuthNav from './AuthApp/Nav';
import UnauthNav from './UnauthApp/Nav';

const AppSelector = (): React.ReactElement => {
  const {
    state: { user },
  } = useContext(UserContext);

  return user ? <AuthNav /> : <UnauthNav />;
};

export default AppSelector;
