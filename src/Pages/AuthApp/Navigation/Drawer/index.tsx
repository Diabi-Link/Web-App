import React, { useState } from 'react';
import styled from 'styled-components';
import DrawerMenu from './DrawerMenu';
import DrawerChat from './DrawerChat';

type Props = {
  children?: React.ReactNode;
  onMobile?: {
    isOpen: boolean;
    setMobileIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  chat: {
    chatOn: boolean;
    setChatOn: React.Dispatch<React.SetStateAction<boolean>>;
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

const DrawerContainer = styled.nav<Arguments & { chatOn: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ isOpen, isOnMobile }) => getDrawerSize({ isOpen, isOnMobile })};
  min-height: 100%;
  background: ${({ theme, chatOn }) =>
    chatOn ? theme.main.white : theme.main.primary};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  transition: width 0.4s cubic-bezier(0.38, 0.01, 0.09, 0.98);
  border-radius: ${({ chatOn }) => (chatOn ? '0' : '0 0.45rem 0.45rem 0')};
  z-index: 9999;
`;

const PageWrapper = styled.div<Arguments>`
  padding-left: ${({ isOpen, isOnMobile }) =>
    getDrawerSize({ isOpen, isOnMobile })};
  transition: padding-left 0.4s cubic-bezier(0.38, 0.01, 0.09, 0.98);
`;

const Drawer = ({ children, onMobile, chat: { chatOn, setChatOn } }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const handleLock = () => setIsLocked(!isLocked);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      <DrawerContainer
        isOpen={
          isOpen ||
          isLocked ||
          (chatOn && onMobile === undefined) ||
          (onMobile !== undefined && onMobile.isOpen)
        }
        isOnMobile={onMobile !== undefined}
        onMouseEnter={openDrawer}
        onMouseLeave={closeDrawer}
        chatOn={chatOn}
      >
        {!chatOn && (
          <DrawerMenu
            onMobile={onMobile}
            handleLock={handleLock}
            isLocked={isLocked}
            setChatOn={setChatOn}
          />
        )}
        {chatOn && <DrawerChat setChatOn={setChatOn} />}
      </DrawerContainer>

      <PageWrapper
        isOpen={isOpen || isLocked || chatOn}
        isOnMobile={onMobile !== undefined}
      >
        {children}
      </PageWrapper>
    </>
  );
};

export default Drawer;
