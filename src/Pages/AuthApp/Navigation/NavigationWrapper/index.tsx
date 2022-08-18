import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { DeviceContext } from '../../../../contexts/DeviceContext';
import Drawer from '../Drawer';
import HamburgerMenu from '../HamburgerMenu';

type Props = {
  children: React.ReactNode;
};

const NavigationWrapper = ({ children }: Props) => {
  const { isMobileOrTablet } = useContext(DeviceContext);
  const location = useLocation();
  const [chatOn, setChatOn] = useState(location.pathname.endsWith('/chat'));

  useEffect(() => {
    setChatOn(location.pathname.endsWith('/chat'));
  }, [location]);

  return (
    <>
      {!isMobileOrTablet && (
        <Drawer chat={{ chatOn, setChatOn }}>{children}</Drawer>
      )}
      {isMobileOrTablet && (
        <HamburgerMenu chat={{ chatOn, setChatOn }}>{children}</HamburgerMenu>
      )}
    </>
  );
};

export default NavigationWrapper;
