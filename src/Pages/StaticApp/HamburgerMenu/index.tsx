import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';

import { ReactComponent as CloseIconSvg } from '../../../assets/svgs/CloseIcon.svg';

import Button from '../../../ui/Button';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

const HamburgerMenu = ({ isOpen, toggle }: Props) => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const handleClick = (link: string) => {
    push(link);
    toggle();
  };

  return (
    <Container isOpen={isOpen}>
      <IconButton onClick={toggle}>
        <CloseIconSvg />
      </IconButton>

      <HamburgerWrapper>
        <HamburgerLink
          to="solution"
          smooth
          duration={500}
          spy
          offset={-80}
          onClick={toggle}
        >
          {t('Navbar.Solution')}
        </HamburgerLink>

        <HamburgerLink
          to="services"
          smooth
          duration={500}
          spy
          offset={-30}
          onClick={toggle}
        >
          {t('Navbar.Services')}
        </HamburgerLink>

        <HamburgerLink
          to="pricing"
          smooth
          duration={500}
          spy
          offset={-60}
          onClick={toggle}
        >
          {t('Navbar.Pricing')}
        </HamburgerLink>

        <HamburgerLink
          to="faq"
          smooth
          duration={500}
          spy
          offset={-150}
          onClick={toggle}
        >
          {t('Navbar.FAQ')}
        </HamburgerLink>

        <HamburgerLink
          to="team"
          smooth
          duration={500}
          spy
          offset={-30}
          onClick={toggle}
        >
          {t('Navbar.Team')}
        </HamburgerLink>

        <HamburgerLink
          to="timeline"
          smooth
          duration={500}
          spy
          offset={-30}
          onClick={toggle}
        >
          {t('Navbar.Timeline')}
        </HamburgerLink>

        <HamburgerLink
          to="contact"
          smooth
          duration={500}
          spy
          offset={-30}
          onClick={toggle}
        >
          {t('Navbar.Contact')}
        </HamburgerLink>
      </HamburgerWrapper>
      <ButtonWrapper>
        <NavButton
          label={t('StaticNav.Login')}
          btnStyle="primary"
          outlined
          onClick={() => handleClick('/login')}
          data-testid="login-button"
        />
        <NavButton
          label={t('StaticNav.Register')}
          btnStyle="white"
          onClick={() => handleClick('/register/user')}
          data-testid="register-button"
        />
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div<{ isOpen: boolean }>`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.main.primary};
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  top: ${({ isOpen }) => (isOpen ? '0' : ' -100%')};
`;

const IconButton = styled.div`
  position: absolute;
  top: 30px;
  left: 25px;
  border: none;
  & > svg {
    color: white;
  }
`;

const HamburgerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HamburgerLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  margin: 1rem auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavButton = styled(Button)`
  width: 200px;
  height: 40px;
  margin: 0.5rem;
`;

export default HamburgerMenu;
