import React from 'react';
import styled from 'styled-components';

import Header from './Header';

const ChatPage = (): React.ReactElement => {
  return (
    <Container data-testid="auth-chat-page">
      <Header firstName="Nicolas" lastName="Carrasco" account="referent" />
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
`;

export default ChatPage;
