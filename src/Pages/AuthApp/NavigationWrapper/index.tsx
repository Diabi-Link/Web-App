import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { lock } from 'react-icons-kit/fa/lock';
import { home } from 'react-icons-kit/fa/home';
import { user } from 'react-icons-kit/fa/user';

import { useLocation } from 'react-router-dom';
import { ReactComponent as LogoText } from '../../../assets/svgs/DiabiLink.svg';
import Link from '../../../ui/Link';
import Heading from '../../../ui/Heading';

type Props = {
  children: React.ReactNode;
};

type Arguments = {
  isOpen: boolean;
};

const getDrawerSize = ({ isOpen }: Arguments) =>
  isOpen ? '14.5rem' : '3.75rem';

const DrawerContainer = styled.nav<Arguments>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ isOpen }) => getDrawerSize({ isOpen })};
  min-height: 100%;
  background: ${({ theme }) => theme.main.primary};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  transition: width 0.4s cubic-bezier(0.38, 0.01, 0.09, 0.98);
  border-radius: 0 0.45rem 0.45rem 0;
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

const NavigationWrapper = ({ children }: Props) => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const handleLock = () => setIsLocked(!isLocked);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      <DrawerContainer
        isOpen={isOpen || isLocked}
        onMouseEnter={openDrawer}
        onMouseLeave={closeDrawer}
      >
        <DrawerWrapper>
          <ItemWrapper>
            <ItemIcon onClick={handleLock} isActive={isLocked}>
              <Icon icon={lock} size={34} />
            </ItemIcon>
            {(isOpen || isLocked) && <LogoText />}
          </ItemWrapper>

          <ItemContainer to="/" isActive={location.pathname === '/'}>
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
            to="/profile"
            isActive={location.pathname === '/profile'}
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

export default NavigationWrapper;
