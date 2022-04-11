import React, { useState } from 'react';
import styled from 'styled-components';

import SendImg from '../../../../assets/pngs/send.png';

type Props = {
  addMessage: (text: string) => Promise<void>;
};

const Footer = ({ addMessage }: Props): React.ReactElement => {
  const [sendAnim, setSendAnim] = useState(false);
  const [value, setValue] = useState('');

  const sendMessage = () => {
    if (value !== '') {
      setValue('');
      addMessage(value);
    }
  };

  const handleClick = () => {
    setSendAnim(true);
    setTimeout(() => setSendAnim(false), 200);
    sendMessage();
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Container>
      <StyledInput
        placeholder="Écrivez votre message..."
        name="message"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeypress}
      />
      <SendButton sendAnim={sendAnim} onClick={handleClick} type="submit">
        <Send src={SendImg} alt="Send" />
      </SendButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.main.whiteBroken};
  margin: 20px 0;
`;

const StyledInput = styled.input`
  @media (max-width: 420px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    max-width: 88%;
  }
  border: none;
  height: 40px;
  padding: 0 20px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.main.white};
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.main.dark};
  &:placeholder {
    color: ${(props) => props.theme.main.gray};
  }
  &:focus {
    outline: none;
  }
  width: 90%;
`;

const Send = styled.img`
  max-width: 100%;
`;

const SendButton = styled.button<{ sendAnim: boolean }>`
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  border: none;
  background-color: transparent;
  width: 40px;

  animation: ${({ sendAnim }) =>
    sendAnim ? 'zoom-in-zoom-out 0.2s ease-in-out' : ''};

  @keyframes zoom-in-zoom-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default Footer;
