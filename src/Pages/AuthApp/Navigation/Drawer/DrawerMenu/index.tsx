import React, { Dispatch, SetStateAction, useContext } from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { lock } from 'react-icons-kit/fa/lock';
import { home } from 'react-icons-kit/fa/home';
import { group } from 'react-icons-kit/fa/group';
import { user as userIcon } from 'react-icons-kit/fa/user';
import { plus } from 'react-icons-kit/fa/plus';
import { areaChart } from 'react-icons-kit/fa/areaChart';
import { comments } from 'react-icons-kit/fa/comments';
import { ic_notifications as notification } from 'react-icons-kit/md/ic_notifications';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../../../../contexts/UserContext';
import { ReactComponent as LogoText } from '../../../../../assets/svgs/DiabiLink.svg';
import Link from '../../../../../ui/Link';
import Heading from '../../../../../ui/Heading';

type Props = {
  onMobile?: {
    isOpen: boolean;
    setMobileIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  handleLock: () => void;
  isLocked: boolean;
  setChatOn: Dispatch<SetStateAction<boolean>>;
};

type Arguments = {
  isOpen: boolean;
  isOnMobile?: boolean;
};

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

const DrawerMenu = ({ onMobile, handleLock, isLocked, setChatOn }: Props) => {
  const location = useLocation();

  const {
    state: { user },
  } = useContext(UserContext);

  const closeDrawerOnMobile = () => {
    setChatOn(false);
    if (onMobile !== undefined) {
      onMobile.setMobileIsOpen(false);
    }
  };

  return (
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
        to="/contacts/menu"
        isActive={location.pathname.includes('/contacts')}
        onClick={closeDrawerOnMobile}
        data-testid="contacts-navigation-button"
      >
        <ItemWrapper>
          <ItemIcon isActive={location.pathname.includes('/contacts')}>
            <Icon icon={group} size={32} />
          </ItemIcon>
          <ItemHeading
            isActive={location.pathname.includes('/contacts')}
            level={2}
          >
            Contacts
          </ItemHeading>
        </ItemWrapper>
      </ItemContainer>

      {user?.account === 'patient' && (
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
      )}

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
          <ItemHeading isActive={location.pathname === '/analytics'} level={2}>
            Analytics
          </ItemHeading>
        </ItemWrapper>
      </ItemContainer>

      <ItemContainer
        to="/alerts"
        isActive={location.pathname === '/alerts'}
        onClick={closeDrawerOnMobile}
        data-testid="alert-navigation-button"
      >
        <ItemWrapper>
          <ItemIcon isActive={location.pathname === '/alerts'}>
            <Icon icon={notification} size={34} />
          </ItemIcon>
          <ItemHeading isActive={location.pathname === '/alerts'} level={2}>
            Alertes
          </ItemHeading>
        </ItemWrapper>
      </ItemContainer>

      <ItemContainer
        to="/chat"
        isActive={location.pathname === '/chat'}
        onClick={() => setChatOn(true)}
        data-testid="chat-navigation-button"
      >
        <ItemWrapper>
          <ItemIcon isActive={location.pathname === '/chat'}>
            <Icon icon={comments} size={32} />
          </ItemIcon>
          <ItemHeading isActive={location.pathname === '/chat'} level={2}>
            Chat
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
            <Icon icon={userIcon} size={34} />
          </ItemIcon>
          <ItemHeading isActive={location.pathname === '/profile'} level={2}>
            Profil
          </ItemHeading>
        </ItemWrapper>
      </ItemContainer>
    </DrawerWrapper>
  );
};

export default DrawerMenu;
