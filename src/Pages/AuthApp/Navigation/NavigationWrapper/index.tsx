import React, { useContext } from 'react';

import { DeviceContext } from '../../../../contexts/DeviceContext';
import Drawer from '../Drawer';
import HamburgerMenu from '../HamburgerMenu';

type Props = {
  children: React.ReactNode;
};

const NavigationWrapper = ({ children }: Props) => {
  const { isMobileOrTablet } = useContext(DeviceContext);
  return (
    <>
      {!isMobileOrTablet && <Drawer>{children}</Drawer>}
      {isMobileOrTablet && <HamburgerMenu>{children}</HamburgerMenu>}
    </>
  );
};

export default NavigationWrapper;
