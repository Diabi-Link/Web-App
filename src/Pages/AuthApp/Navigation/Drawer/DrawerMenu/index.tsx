import React, { Dispatch, SetStateAction, useContext } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from 'react-icons-kit';
import { lock } from 'react-icons-kit/fa/lock';
import { group } from 'react-icons-kit/fa/group';
import { signOut } from 'react-icons-kit/fa/signOut';
import { user as userIcon } from 'react-icons-kit/fa/user';
import { plus } from 'react-icons-kit/fa/plus';
import { areaChart } from 'react-icons-kit/fa/areaChart';
import { comments } from 'react-icons-kit/fa/comments';
import { ic_notifications as notification } from 'react-icons-kit/md/ic_notifications';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  UserActionTypes,
  UserContext,
} from '../../../../../contexts/UserContext';
import Link from '../../../../../ui/Link';
import { Heading } from '../../../../../ui/Heading';
import { useAuthToken } from '../../../../../hooks/useAuthToken';
import { avatars } from '../../../../../utils/avatars';

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

const DrawerMenu = ({ onMobile, handleLock, isLocked, setChatOn }: Props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const {
    dispatch,
    state: { user },
  } = useContext(UserContext);
  const { removeAuthToken } = useAuthToken();
  const { push } = useHistory();

  const closeDrawerOnMobile = () => {
    setChatOn(false);
    if (onMobile !== undefined) {
      onMobile.setMobileIsOpen(false);
    }
  };

  const logout = (): void => {
    push('/');
    removeAuthToken();
    dispatch({ type: UserActionTypes.EmptyUser });
  };

  return (
    <DrawerWrapper>
      <ItemWrapper>
        <LogoWrapper isOnMobile={onMobile !== undefined}>
          <Photo>{user && avatars[user.account].svg}</Photo>{' '}
          <NameText>
            {user?.firstName} {user?.lastName}
          </NameText>
        </LogoWrapper>
      </ItemWrapper>

      <ItemNoLinkContainer>
        <ItemWrapper onClick={handleLock}>
          {!onMobile && (
            <>
              <ItemIcon isActive={isLocked}>
                <Icon icon={lock} size={34} />
              </ItemIcon>
              <ItemHeading isActive={isLocked} level={2}>
                {t('Drawer.Lock')}
              </ItemHeading>
            </>
          )}
        </ItemWrapper>
      </ItemNoLinkContainer>

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
            {t('Drawer.Analytics')}
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
            {t('Drawer.Contacts')}
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
              {t('Drawer.AddMeasure')}
            </ItemHeading>
          </ItemWrapper>
        </ItemContainer>
      )}

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
            {t('Drawer.Alerts')}
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
            {t('Drawer.Chat')}
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
            {t('Drawer.Profile')}
          </ItemHeading>
        </ItemWrapper>
      </ItemContainer>

      <ItemNoLinkContainer onClick={logout}>
        <ItemWrapper>
          <ItemIcon isActive={false}>
            <Icon icon={signOut} size={34} />
          </ItemIcon>
          <ItemHeading isActive={false} level={2}>
            {t('Drawer.Logout')}
          </ItemHeading>
        </ItemWrapper>
      </ItemNoLinkContainer>
    </DrawerWrapper>
  );
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
  margin-top: 1.475rem;
  cursor: pointer;
`;

const ItemNoLinkContainer = styled.div`
  width: 100%;
  border: none;
  background-color: transparent;
  margin-top: 1.475rem;
  cursor: pointer;
`;

const ItemWrapper = styled.div`
  width: 100%;
  padding-right: 1.875rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${({ onClick }) =>
    onClick !== undefined &&
    css`
      cursor: pointer;
    `}
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
  padding-top: 0.5rem;
  display: flex;
  align-items: center;
`;

const Photo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.main.primaryLight};
  border-radius: 50%;
  margin-right: 10px;
`;

const NameText = styled.p`
  color: ${({ theme }) => theme.main.white};
  font-weight: 600;
  width: 100%;
  min-width: 14.5rem;
`;

const ItemHeading = styled(Heading)<{ isActive: boolean }>`
  margin-left: 0.625rem;
  font-weight: bold;
  color: ${({ theme, isActive }) =>
    isActive ? theme.main.white : theme.main.primaryLighter};
  transition: 0.15s ease-in-out;
`;

export default DrawerMenu;
