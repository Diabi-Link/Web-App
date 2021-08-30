import React from 'react';

import { isMobileOrTablet } from '../../../../utils/isMobileOrTablet';
import DrawerMenu from '../DrawerMenu';
import HamburgerMenu from '../HamburgerMenu';

type Props = {
  children: React.ReactNode;
};

const NavigationWrapper = ({ children }: Props) => {
  return (
    <>
      {!isMobileOrTablet() && <DrawerMenu>{children}</DrawerMenu>}
      {isMobileOrTablet() && <HamburgerMenu>{children}</HamburgerMenu>}
    </>
  );
};

export default NavigationWrapper;
