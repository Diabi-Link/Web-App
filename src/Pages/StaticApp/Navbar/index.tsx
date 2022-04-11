import { FaBars } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import {
  Nav,
  NavbarContainer,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
  Img,
} from './NavbarElement';

import logo from '../../../assets/svgs/Logo.svg';

type Props = {
  toggle: () => void;
};

const Navbar = ({ toggle }: Props) => {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) setScrollNav(true);
    else setScrollNav(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <Nav scrollNav={scrollNav}>
      <NavbarContainer>
        <Img onClick={toggleHome} src={logo} alt="logo" />
        <MobileIcon scrollNav={scrollNav} onClick={toggle}>
          <FaBars />
        </MobileIcon>
        <NavMenu>
          <NavItem>
            <NavLinks
              to="about"
              smooth
              duration={500}
              spy
              offset={-80}
              scrollNav={scrollNav}
            >
              À propos
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks
              to="team"
              smooth
              duration={500}
              spy
              offset={-80}
              scrollNav={scrollNav}
            >
              Équipe
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks
              to="services"
              smooth
              duration={500}
              spy
              offset={-80}
              scrollNav={scrollNav}
            >
              Services
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks
              to="timeline"
              smooth
              duration={500}
              spy
              offset={-80}
              scrollNav={scrollNav}
            >
              Projection
            </NavLinks>
          </NavItem>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/login" scrollNav={scrollNav}>
            Se connecter
          </NavBtnLink>
          <NavBtnLink to="/register/user" scrollNav={scrollNav}>
            S&apos;inscrire
          </NavBtnLink>
        </NavBtn>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
