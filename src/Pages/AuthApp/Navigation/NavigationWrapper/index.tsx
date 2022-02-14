import React, { useContext, useState } from 'react';

import { DeviceContext } from '../../../../contexts/DeviceContext';
import Drawer from '../Drawer';
import HamburgerMenu from '../HamburgerMenu';

type Props = {
  children: React.ReactNode;
};

const NavigationWrapper = ({ children }: Props) => {
  const { isMobileOrTablet } = useContext(DeviceContext);
  const [chatOn, setChatOn] = useState(false);

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
