import React from 'react';

import { isMobileOrTablet } from '../../../utils/isMobileOrTablet';
import DrawerMenu from '../DrawerMenu';

type Props = {
  children: React.ReactNode;
};

const NavigationWrapper = ({ children }: Props) => {
  return <>{!isMobileOrTablet() && <DrawerMenu>{children}</DrawerMenu>}</>;
};

export default NavigationWrapper;
