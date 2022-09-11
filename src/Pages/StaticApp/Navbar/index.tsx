import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { animateScroll as scroll, Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';

import { Icon } from 'react-icons-kit';
import { ic_dehaze as Burger } from 'react-icons-kit/md/ic_dehaze';

import LogoRounded from '../../../assets/svgs/LogoRounded.svg';

import Button from '../../../ui/Button';

type Props = {
  toggle: () => void;
};

const Navbar = ({ toggle }: Props) => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <Nav>
      <Img onClick={toggleHome} src={LogoRounded} alt="logo" />
      <MobileIcon onClick={toggle}>
        <Icon icon={Burger} size={20} />
      </MobileIcon>
      <NavMenu>
        <NavLinks to="solution" smooth duration={500} spy offset={-150}>
          {t('Navbar.Solution')}
        </NavLinks>

        <NavLinks to="services" smooth duration={500} spy offset={-150}>
          {t('Navbar.Services')}
        </NavLinks>

        <NavLinks to="faq" smooth duration={500} spy offset={-150}>
          {t('Navbar.FAQ')}
        </NavLinks>

        <NavLinks to="team" smooth duration={500} spy offset={-90}>
          {t('Navbar.Team')}
        </NavLinks>

        <NavLinks to="timeline" smooth duration={500} spy offset={-80}>
          {t('Navbar.Timeline')}
        </NavLinks>

        <NavLinks to="contact" smooth duration={500} spy offset={0}>
          {t('Navbar.Contact')}
        </NavLinks>
      </NavMenu>
      <ButtonWrapper>
        <NavButton
          label={t('StaticNav.Login')}
          btnStyle="primary"
          outlined
          onClick={() => push('/login')}
          data-testid="login-button"
          shadow
        />
        <NavButton
          label={t('StaticNav.Register')}
          btnStyle="white"
          onClick={() => push('/register/user')}
          data-testid="register-button"
          shadow
        />
      </ButtonWrapper>
    </Nav>
  );
};

const Nav = styled.nav`
  background: ${({ theme }) => theme.main.primary};
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 0 24px;

  @media (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

const MobileIcon = styled.div`
  display: block;
  posisiton: absolute;
  top: 0;
  right: 0;
  transform: translate(-100%, 60%);
  font-size: 1.8rem;
  cursor: pointer;
  color: white;

  @media (min-width: 599px) {
    display: none;
  }
`;

const NavMenu = styled.ul`
  display: flex;

  @media (orientation: portrait) and (max-width: 600px) {
    display: none;
  }
`;

const NavLinks = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  font-weight: 600;
  padding: 0 1rem;
  height: 80px;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid white;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavButton = styled(Button)`
  width: 130px;
  height: 40px;
  margin: 0.5rem;
`;

const Img = styled.img`
  max-width: 15%;
  justify-self: flex-start;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 0 0px 0;
  padding-right: 0;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default Navbar;
