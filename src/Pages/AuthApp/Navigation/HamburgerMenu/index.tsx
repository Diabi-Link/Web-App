import React, { useState } from 'react';
import styled from 'styled-components';
import DrawerMenu from '../DrawerMenu';

type Props = {
  children: React.ReactNode;
};

const Container = styled.div`
  position: absolute;
  top: 2rem;
  right: 1rem;
  width: 5rem;
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
    margin-top: 0.7rem;
  }
`;

const HamburgerLine = styled.div`
  margin-bottom: 0.7rem;
  height: 0.3rem;
  width: 3.3rem;
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

const HamburgerMenu = ({ children }: Props) => {
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
      <DrawerMenu onMobile={{ isOpen, setMobileIsOpen: setIsOpen }} />
      {children}
    </>
  );
};

export default HamburgerMenu;
