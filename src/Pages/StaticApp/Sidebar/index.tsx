import React from 'react';

import { Icon } from 'react-icons-kit';
import { ic_dehaze as Burger } from 'react-icons-kit/md/ic_dehaze';
import {
  // Icon,
  SidebarContainer,
  SidebarLink,
  SidebarMenu,
  SidebarRoute,
  SidebarWrapper,
  SideBtnWrap,
} from './SidebarElements';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

const Sidebar = ({ isOpen, toggle }: Props) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      {/* <Icon onClick={toggle}><CloseIcon /></Icon> */}
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="about" onClick={toggle}>
            À propos
          </SidebarLink>
          <SidebarLink to="team" onClick={toggle}>
            Équipe
          </SidebarLink>
          <SidebarLink to="services" onClick={toggle}>
            Services
          </SidebarLink>
          <SidebarLink to="timeline" onClick={toggle}>
            Projection
          </SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to="/login">Se connecter</SidebarRoute>
        </SideBtnWrap>
        <SideBtnWrap>
          <SidebarRoute to="/register/user">S&apos;inscrire</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
