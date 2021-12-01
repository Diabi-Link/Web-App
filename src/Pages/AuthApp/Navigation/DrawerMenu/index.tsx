import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { lock } from 'react-icons-kit/fa/lock';
import { home } from 'react-icons-kit/fa/home';
import { user } from 'react-icons-kit/fa/user';
import { plus } from 'react-icons-kit/fa/plus';
import { areaChart } from 'react-icons-kit/fa/areaChart';
import { useLocation } from 'react-router-dom';
import { ReactComponent as LogoText } from '../../../../assets/svgs/DiabiLink.svg';
import Link from '../../../../ui/Link';
import Heading from '../../../../ui/Heading';

type Props = {
  children?: React.ReactNode;
  onMobile?: {
    isOpen: boolean;
    setMobileIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

type Arguments = {
  isOpen: boolean;
  isOnMobile?: boolean;
};

const getDrawerSize = ({ isOpen, isOnMobile }: Arguments) => {
  if (!isOnMobile) {
    return isOpen ? '14.5rem' : '3.75rem';
  }
  return isOpen ? '14.5rem' : '0rem';
};

const DrawerContainer = styled.nav<Arguments>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ isOpen, isOnMobile }) => getDrawerSize({ isOpen, isOnMobile })};
  min-height: 100%;
  background: ${({ theme }) => theme.main.primary};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  transition: width 0.4s cubic-bezier(0.38, 0.01, 0.09, 0.98);
  border-radius: 0 0.45rem 0.45rem 0;
  z-index: 9999;
`;

const DrawerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ItemContainer = styled(Link)<{ isActive: boolean }>`
  width: 100%;
  border: none;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.main.primaryLight : 'transparent'};
  margin-top: 1.875rem;
  cursor: pointer;
`;

const ItemWrapper = styled.div`
  width: 100%;
  padding-right: 1.875rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ItemIcon = styled.button<{ isActive: boolean }>`
  padding: 0.625rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme, isActive }) =>
    isActive ? theme.main.white : theme.main.primaryLighter};
  transition: 0.15s ease-in-out;
`;

const LogoWrapper = styled.div<Pick<Arguments, 'isOnMobile'>>`
  margin-left: 0.625rem;
  padding-top: ${({ isOnMobile }) => (isOnMobile ? '1rem' : '0')};
`;

const StyledLogoText = styled(LogoText)`
  height: 1.35rem;
  width: auto;
`;

const ItemHeading = styled(Heading)<{ isActive: boolean }>`
  margin-left: 0.625rem;
  font-weight: bold;
  color: ${({ theme, isActive }) =>
    isActive ? theme.main.white : theme.main.primaryLighter};
  transition: 0.15s ease-in-out;
`;

const PageWrapper = styled.div<Arguments>`
  padding-left: ${({ isOpen }) => getDrawerSize({ isOpen })};
  transition: padding-left 0.4s cubic-bezier(0.38, 0.01, 0.09, 0.98);
`;

const DrawerMenu = ({ children, onMobile }: Props) => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const handleLock = () => setIsLocked(!isLocked);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  const closeDrawerOnMobile = () => {
    if (onMobile !== undefined) {
      onMobile.setMobileIsOpen(false);
    }
  };

  return (
    <>
      <DrawerContainer
        isOpen={
          isOpen || isLocked || (onMobile !== undefined && onMobile.isOpen)
        }
        isOnMobile={onMobile !== undefined}
        onMouseEnter={openDrawer}
        onMouseLeave={closeDrawer}
      >
        <DrawerWrapper>
          <ItemWrapper>
            {!onMobile && (
              <ItemIcon onClick={handleLock} isActive={isLocked}>
                <Icon icon={lock} size={34} />
              </ItemIcon>
            )}
            <LogoWrapper isOnMobile={onMobile !== undefined}>
              <StyledLogoText />
            </LogoWrapper>
          </ItemWrapper>

          <ItemContainer
            to="/"
            isActive={location.pathname === '/'}
            onClick={closeDrawerOnMobile}
            data-testid="home-navigation-button"
          >
            <ItemWrapper>
              <ItemIcon isActive={location.pathname === '/'}>
                <Icon icon={home} size={34} />
              </ItemIcon>
              <ItemHeading isActive={location.pathname === '/'} level={2}>
                Accueil
              </ItemHeading>
            </ItemWrapper>
          </ItemContainer>

          <ItemContainer
            to="/add-measurement"
            isActive={location.pathname === '/add-measurement'}
            onClick={closeDrawerOnMobile}
            data-testid="add-measurement-navigation-button"
          >
            <ItemWrapper>
              <ItemIcon isActive={location.pathname === '/add-measurement'}>
                <Icon icon={plus} size={34} />
              </ItemIcon>
              <ItemHeading
                isActive={location.pathname === '/add-measurement'}
                level={2}
              >
                Ajouter mesure
              </ItemHeading>
            </ItemWrapper>
          </ItemContainer>

          <ItemContainer
            to="/analytics"
            isActive={location.pathname === '/analytics'}
            onClick={closeDrawerOnMobile}
            data-testid="analytics-navigation-button"
          >
            <ItemWrapper>
              <ItemIcon isActive={location.pathname === '/analytics'}>
                <Icon icon={areaChart} size={32} />
              </ItemIcon>
              <ItemHeading
                isActive={location.pathname === '/analytics'}
                level={2}
              >
                Analytics
              </ItemHeading>
            </ItemWrapper>
          </ItemContainer>

          <ItemContainer
            to="/profile"
            isActive={location.pathname === '/profile'}
            onClick={closeDrawerOnMobile}
            data-testid="profile-navigation-button"
          >
            <ItemWrapper>
              <ItemIcon isActive={location.pathname === '/profile'}>
                <Icon icon={user} size={34} />
              </ItemIcon>
              <ItemHeading
                isActive={location.pathname === '/profile'}
                level={2}
              >
                Profil
              </ItemHeading>
            </ItemWrapper>
          </ItemContainer>
        </DrawerWrapper>
      </DrawerContainer>

      <PageWrapper isOpen={isOpen || isLocked}>{children}</PageWrapper>
    </>
  );
};

export default DrawerMenu;
