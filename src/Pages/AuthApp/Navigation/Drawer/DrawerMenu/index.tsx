import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
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

import { ReactComponent as UnlockSvg } from '../../../../../assets/svgs/Unlock.svg';
import { ReactComponent as LockSvg } from '../../../../../assets/svgs/Lock.svg';
import { ReactComponent as AddSvg } from '../../../../../assets/svgs/Add.svg';
import { ReactComponent as AnalyticsSvg } from '../../../../../assets/svgs/Analytics.svg';
import { ReactComponent as ChatSvg } from '../../../../../assets/svgs/Chat.svg';
import { ReactComponent as LogoutSvg } from '../../../../../assets/svgs/Logout.svg';
import { ReactComponent as ProfileSvg } from '../../../../../assets/svgs/Profile.svg';
import { ReactComponent as ContactsSvg } from '../../../../../assets/svgs/Contacts.svg';
import { ReactComponent as AlertsSvg } from '../../../../../assets/svgs/Alerts.svg';
import { PictureContext } from '../../../../../contexts/PictureContext';
import Loader from '../../../../../ui/Loader';

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
  const [div, setDiv] = useState(0);
  const { picture, pictureLoading } = useContext(PictureContext);

  const patientRoutes =
    user?.isPaid || user?.account === 'patient'
      ? [
          '/analytics',
          '/contacts',
          '/add-measurement',
          '/alerts',
          '/chat',
          '/profile',
        ]
      : ['/profile'];

  const routes =
    user?.isPaid || user?.account === 'patient'
      ? ['/analytics', '/contacts', '/alerts', '/chat', '/profile']
      : ['/profile'];

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

  useEffect(() => {
    const routesToSearch = user?.account === 'patient' ? patientRoutes : routes;
    setDiv(routesToSearch.findIndex((r) => location.pathname.includes(r)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <DrawerWrapper>
      <ItemWrapper>
        <LogoWrapper isOnMobile={onMobile !== undefined}>
          {pictureLoading && (
            <LoaderContainer>
              <Loader loaderStyle="white" />
            </LoaderContainer>
          )}
          {!pictureLoading && !picture && (
            <Photo>{user && avatars[user.account].svg}</Photo>
          )}
          {!pictureLoading && picture !== null && (
            <Picture alt="profil-picture" src={picture} />
          )}{' '}
          <NameText>
            {user?.firstName} {user?.lastName}
          </NameText>
        </LogoWrapper>
      </ItemWrapper>

      <ItemNoLinkContainer>
        <ItemWrapper onClick={handleLock}>
          {!onMobile && (
            <>
              <ItemIcon isActive={false}>
                {isLocked ? <LockSvg /> : <UnlockSvg />}
              </ItemIcon>
              <ItemHeading isActive={false} level={2}>
                {isLocked ? t('Drawer.Unlock') : t('Drawer.Lock')}
              </ItemHeading>
            </>
          )}
        </ItemWrapper>
      </ItemNoLinkContainer>

      <NavContainer>
        <Divider index={div} />
        {(user?.isPaid || user?.account === 'patient') && (
          <>
            <ItemContainer
              to="/analytics"
              isActive={location.pathname === '/analytics'}
              onClick={closeDrawerOnMobile}
              data-testid="analytics-navigation-button"
            >
              <ItemWrapper>
                <ItemIcon isActive={location.pathname === '/analytics'}>
                  <AnalyticsSvg />
                </ItemIcon>
                <ItemHeading
                  isActive={location.pathname === '/analytics'}
                  level={2}
                >
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
                  <ContactsSvg />
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
                    <AddSvg />
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
                  <AlertsSvg />
                </ItemIcon>
                <ItemHeading
                  isActive={location.pathname === '/alerts'}
                  level={2}
                >
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
                  <ChatSvg />
                </ItemIcon>
                <ItemHeading isActive={location.pathname === '/chat'} level={2}>
                  {t('Drawer.Chat')}
                </ItemHeading>
              </ItemWrapper>
            </ItemContainer>
          </>
        )}

        <ItemContainer
          to="/profile"
          isActive={location.pathname === '/profile'}
          onClick={closeDrawerOnMobile}
          data-testid="profile-navigation-button"
        >
          <ItemWrapper>
            <ItemIcon isActive={location.pathname === '/profile'}>
              <ProfileSvg />
            </ItemIcon>
            <ItemHeading isActive={location.pathname === '/profile'} level={2}>
              {t('Drawer.Profile')}
            </ItemHeading>
          </ItemWrapper>
        </ItemContainer>
      </NavContainer>

      <ItemNoLinkContainer onClick={logout}>
        <ItemWrapper>
          <ItemIcon isActive={false}>
            <LogoutSvg />
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

  & > div:nth-child(2) {
    margin: 1.475rem 0;
  }
`;

const NavContainer = styled.div`
  position: relative;
`;

const ItemContainer = styled(Link)<{ isActive: boolean }>`
  width: 100%;
  // border: none;
  cursor: pointer;
  position: relative;
  margin-bottom: 1.475rem;
`;

const ItemNoLinkContainer = styled.div`
  width: 100%;
  border: none;
  background-color: transparent;
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

const Divider = styled.div<{ index: number }>`
  position: absolute;
  top: 0;
  height: 60px;
  width: 100%;
  border-radius: 25px 0 0 25px;
  background-color: ${({ theme }) => theme.main.whiteBroken};
  transition: 0.5s;
  transform: ${({ index }) => `translateY(calc(82.5px * ${index}))`};
  &:before {
    content: '';
    position: absolute;

    background-color: transparent;
    top: -11px;
    right: 0px;
    height: 11px;
    width: 6px;
    border-bottom-right-radius: 25px;
    box-shadow: ${({ theme }) => `0 5px 0 0 ${theme.main.whiteBroken}`};
  }
  &:after {
    content: '';
    position: absolute;

    background-color: transparent;
    bottom: -11px;
    right: 0px;
    height: 11px;
    width: 6px;
    border-top-right-radius: 25px;
    box-shadow: ${({ theme }) => `0 -5px 0 0 ${theme.main.whiteBroken}`};
  }
`;

const ItemIcon = styled.button<{ isActive: boolean }>`
  padding: 0.625rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme, isActive }) =>
    isActive ? theme.main.primary : theme.main.primaryLighter};
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
  width: 50px;
  height: 40px;
  background-color: ${(props) => props.theme.main.primaryLight};
  border-radius: 50%;
  margin-right: 10px;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 40px;
  margin-right: 10px;
`;

const Picture = styled.img`
  width: 50px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const NameText = styled.p`
  color: ${({ theme }) => theme.main.white};
  font-weight: 600;
  width: 100%;
  min-width: 14.5rem;
`;

const ItemHeading = styled(Heading)<{ isActive: boolean; isLock?: boolean }>`
  margin-left: 0.625rem;
  font-weight: bold;
  color: ${({ theme, isActive }) =>
    isActive ? theme.main.primary : theme.main.primaryLighter};
  transition: 0.15s ease-in-out;
`;

export default DrawerMenu;
