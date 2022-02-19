import React, { useState } from 'react';
import styled from 'styled-components';
import Drawer from '../Drawer';

type Props = {
  children: React.ReactNode;
  chat: {
    chatOn: boolean;
    setChatOn: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const Container = styled.div`
  position: fixed;
  z-index: 10000;
  top: 1.4rem;
  right: 1rem;
  width: 3rem;
  cursor: pointer;
`;

const HamburgerContainer = styled.div`
  background-color: ${({ theme }) => theme.main.white};
  border-radius: 0.5rem;
  border: 0.1rem solid ${({ theme }) => theme.main.primary};
`;

const HamburgerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  :first-child {
    margin-top: 0.5rem;
  }
`;

const HamburgerLine = styled.div`
  margin-bottom: 0.5rem;
  height: 0.3rem;
  width: 2.3rem;
  background-color: ${({ theme }) => theme.main.primary};
`;

const Closer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.3rem;
  :before,
  :after {
    position: absolute;
    content: ' ';
    height: 3.3rem;
    width: 0.3rem;
    background-color: ${({ theme }) => theme.main.primary};
  }

  :after {
    transform: rotate(-45deg);
  }

  :before {
    transform: rotate(45deg);
  }
`;

const ContainerTest = styled.div<{ isOpen: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: ${({ isOpen }) => (isOpen ? 9999 : 0)};
`;

const ContainerTest2 = styled.div<{ isOpen: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ContainerTest3 = styled.div<{ isOpen: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: ${({ isOpen }) => (isOpen ? 9998 : 0)};
  background-color: ${({ isOpen }) => (isOpen ? 'rgba(0, 0, 0, 0.8)' : '')};
`;

const HamburgerMenu = ({ children, chat }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Container onClick={() => setIsOpen(!isOpen)}>
        {!isOpen && (
          <HamburgerContainer>
            <HamburgerWrapper>
              <HamburgerLine />
              <HamburgerLine />
              <HamburgerLine />
            </HamburgerWrapper>
          </HamburgerContainer>
        )}
        {isOpen && <Closer />}
      </Container>
      <ContainerTest isOpen={isOpen} />
      <ContainerTest3 isOpen={isOpen} />
      <Drawer onMobile={{ isOpen, setMobileIsOpen: setIsOpen }} chat={chat} />
      <ContainerTest2 isOpen={isOpen}>{children}</ContainerTest2>
    </>
  );
};

export default HamburgerMenu;
