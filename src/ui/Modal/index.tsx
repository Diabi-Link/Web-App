import React from 'react';
import styled, { CSSProperties } from 'styled-components';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  children?: React.ReactNode;
};

const Container = styled.div<{ isOpen: boolean }>`
  height: 100vh;
  width: 100vw;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const OutsideModal = styled.div`
  z-index: 10000;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
`;

const Wrapper = styled.div<{
  width: NonNullable<Props['width']>;
  height: NonNullable<Props['height']>;
}>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  z-index: 10001;
  padding: 1.25rem;
  position: fixed;
  background-color: ${({ theme }) => theme.main.white};
  border-radius: 20px;
`;

const Closer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.3rem;
  width: 1.3rem;
  :before,
  :after {
    position: absolute;
    content: ' ';
    height: 1.3rem;
    width: 0.2rem;
    background-color: ${({ theme }) => theme.main.primary};
  }

  :after {
    transform: rotate(-45deg);
  }

  :before {
    transform: rotate(45deg);
  }
  cursor: pointer;
`;

const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

const Modal = ({
  isOpen,
  width = 'auto',
  height = 'auto',
  closeModal,
  children,
}: Props) => {
  React.useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isOpen]);

  return (
    <Container isOpen={isOpen}>
      {isOpen && <OutsideModal onClick={closeModal} />}
      <Wrapper width={width} height={height}>
        <ModalHeader>
          <Closer onClick={closeModal} />
        </ModalHeader>
        {children}
      </Wrapper>
    </Container>
  );
};

export default Modal;
