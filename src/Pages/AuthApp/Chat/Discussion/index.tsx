import React, { useContext, useEffect, useRef } from 'react';
import { DocumentData } from 'firebase/firestore';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { DeviceContext } from '../../../../contexts/DeviceContext';

type Props = {
  messages: DocumentData[] | undefined;
  userId: number | undefined;
};

const Discussion = ({ messages, userId }: Props): React.ReactElement => {
  const messageEndRef = useRef<HTMLInputElement | null>(null);
  const { i18n } = useTranslation();
  const { isMobileOrTablet } = useContext(DeviceContext);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <Container>
      {messages !== undefined &&
        messages.map((message) => {
          const todayDate = new Date().toLocaleDateString(i18n.language, {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          const date = new Date(message.sendAt).toLocaleDateString(
            i18n.language,
            {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            },
          );
          const time = new Date(message.sendAt).toLocaleTimeString(
            i18n.language,
            {
              hour: '2-digit',
              minute: '2-digit',
            },
          );
          return (
            <MessageContainer sender={message.userId === userId}>
              <MessageWrapper sender={message.userId === userId}>
                <MessageDate isMobileOrTablet={isMobileOrTablet}>
                  {todayDate !== date && <>{date} à </>}
                  {time}
                </MessageDate>
                <MessageText sender={message.userId === userId}>
                  {message.text}
                </MessageText>
              </MessageWrapper>
            </MessageContainer>
          );
        })}
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

const MessageContainer = styled.div<{
  sender: boolean;
}>`
  display: flex;
  justify-content: ${({ sender }) => (sender ? 'flex-end' : 'flex-start')};
  margin: 10px 35px;
  @media (max-width: 768px) {
    margin: 10px 15px;
  }

  @media (max-width: 420px) {
    margin: 10px 10px;
  }
`;

const MessageDate = styled.p<{ isMobileOrTablet: boolean | null }>`
  color: ${({ theme }) => theme.main.gray};
  font-size: 12px;
  margin: 0;
  padding-bottom: 4px;
  opacity: ${({ isMobileOrTablet }) => (isMobileOrTablet ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`;

const MessageWrapper = styled.div<{
  sender: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${({ sender }) => (sender ? 'flex-end' : 'flex-start')};

  &:hover ${MessageDate} {
    opacity: 1;
  }
`;

const MessageText = styled.p<{
  sender: boolean;
}>`
  margin: 0;
  position: relative;
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
