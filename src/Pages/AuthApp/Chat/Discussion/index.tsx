import React from 'react';
import styled from 'styled-components';

type Props = {
  messages: { sender: 'you' | 'other'; text: string }[];
};

const Discussion = ({ messages }: Props): React.ReactElement => {
  return (
    <Container>
      {messages.map((message) => (
        <MessageWrapper sender={message.sender}>
          <MessageText sender={message.sender}>{message.text}</MessageText>
        </MessageWrapper>
      ))}
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
  sender: Props['messages'][number]['sender'];
}>`
  display: flex;
  justify-content: ${({ sender }) =>
    sender === 'you' ? 'flex-end' : 'flex-start'};
  margin: 0 35px;
`;

const MessageText = styled.p<{
  sender: Props['messages'][number]['sender'];
}>`
  max-width: 75ch;
  background-color: ${({ theme, sender }) =>
    sender === 'you' ? theme.main.primary : theme.main.white};
  padding: 10px 15px;
  color: ${({ theme, sender }) =>
    sender === 'you' ? theme.main.white : theme.main.black};
  border-radius: 20px;
  font-family: 'Helvetica Neue';
`;

export default Discussion;
