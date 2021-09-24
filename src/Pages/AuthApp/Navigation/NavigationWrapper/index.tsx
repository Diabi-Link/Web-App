import React, { useContext } from 'react';

import { DeviceContext } from '../../../../contexts/DeviceContext';
import DrawerMenu from '../DrawerMenu';
import HamburgerMenu from '../HamburgerMenu';

type Props = {
  children: React.ReactNode;
};

const NavigationWrapper = ({ children }: Props) => {
  const { isMobileOrTablet } = useContext(DeviceContext);
  return (
    <>
      {!isMobileOrTablet && <DrawerMenu>{children}</DrawerMenu>}
      {isMobileOrTablet && <HamburgerMenu>{children}</HamburgerMenu>}
    </>
  );
};

export default NavigationWrapper;
