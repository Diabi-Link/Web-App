import React, { useEffect, useRef } from 'react';
import { DocumentData } from 'firebase/firestore';
import styled from 'styled-components';

type Props = {
  messages: DocumentData[] | undefined;
  userId: number | undefined;
};

const Discussion = ({ messages, userId }: Props): React.ReactElement => {
  const messageEndRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <Container>
      {messages !== undefined &&
        messages.map((message) => (
          <MessageWrapper sender={message.userId === userId}>
            <MessageText sender={message.userId === userId}>
              {message.text}
            </MessageText>
          </MessageWrapper>
        ))}
      <MessageEnd ref={messageEndRef} />
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex-grow: inherit;
  height: 80vh;
`;

const MessageWrapper = styled.div<{
  sender: boolean;
}>`
  display: flex;
  justify-content: ${({ sender }) => (sender ? 'flex-end' : 'flex-start')};
  margin: 0 35px;
  @media (max-width: 768px) {
    margin: 0 15px;
  }

  @media (max-width: 420px) {
    margin: 0 10px;
  }
`;

const MessageText = styled.p<{
  sender: boolean;
}>`
  max-width: 75ch;
  @media (max-width: 1024px) {
    max-width: 55ch;
  }

  @media (max-width: 768px) {
    max-width: 40ch;
  }

  @media (max-width: 420px) {
    max-width: 30ch;
  }

  @media (max-width: 380px) {
    max-width: 28ch;
  }

  background-color: ${({ theme, sender }) =>
    sender ? theme.main.primary : theme.main.white};
  padding: 10px 15px;
  color: ${({ theme, sender }) =>
    sender ? theme.main.white : theme.main.black};
  border-radius: 20px;
  font-family: 'Helvetica Neue';
`;

const MessageEnd = styled.div``;

export default Discussion;
