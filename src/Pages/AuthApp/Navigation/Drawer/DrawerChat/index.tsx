import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';
import Heading from '../../../../../ui/Heading';

type Props = {
  setChatOn: Dispatch<SetStateAction<boolean>>;
};

const DrawerChat = ({ setChatOn }: Props) => {
  return (
    <DrawerWrapper>
      <HeaderWrapper>
        <ArrowBack
          icon={arrowLeft2}
          size={28}
          onClick={() => setChatOn(false)}
        />
        <Heading level={2}>Contacts</Heading>
      </HeaderWrapper>
    </DrawerWrapper>
  );
};

const DrawerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  height: 200px;
`;

const ArrowBack = styled(Icon)`
  color: ${({ theme }) => theme.main.primary};
  position: absolute;
  left: 10px;
  cursor: pointer;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

export default DrawerChat;
