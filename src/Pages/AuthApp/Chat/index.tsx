import React from 'react';
import styled from 'styled-components';
import Discussion from './Discussion';

import Header from './Header';

const messages: { sender: 'you' | 'other'; text: string }[] = [
  {
    sender: 'you',
    text: 'Ok pas de soucis docteur ! La prochaine fois je ferais',
  },
  {
    sender: 'other',
    text:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem. dvhve ',
  },
  {
    sender: 'you',
    text:
      'Ipsum dolor sit  veo consequat.  irure dolor in reprehenderit in voluptate velit',
  },
  {
    sender: 'other',
    text: 'Eos et accusa odio dignissimos ducimus.',
  },
  {
    sender: 'other',
    text:
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit',
  },
  {
    sender: 'other',
    text:
      'Itaque earum rerum hic tenetur a sapiente delectus,  maiores  consequatur aut perferendis',
  },
  {
    sender: 'you',
    text:
      'Alno ditate non provident, similique sunt in culpa qofficia deserunt mollitia animi, id est laborum et dolorum fuga.',
  },
  {
    sender: 'you',
    text: 'Ok pas de soucis docteur ! La prochaine fois je ferais',
  },
  {
    sender: 'other',
    text:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem. dvhve ',
  },
  {
    sender: 'you',
    text:
      'Ipsum dolor sit  veo consequat.  irure dolor in reprehenderit in voluptate velit',
  },
  {
    sender: 'other',
    text: 'Eos et accusa odio dignissimos ducimus.',
  },
  {
    sender: 'other',
    text:
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit',
  },
  {
    sender: 'other',
    text:
      'Itaque earum rerum hic tenetur a sapiente delectus,  maiores  consequatur aut perferendis',
  },
  {
    sender: 'you',
    text:
      'Alno ditate non provident, similique sunt in culpa qofficia deserunt mollitia animi, id est laborum et dolorum fuga.',
  },
];

const ChatPage = (): React.ReactElement => {
  return (
    <Container data-testid="auth-chat-page">
      <Header firstName="Nicolas" lastName="Carrasco" account="referent" />
      <Discussion messages={messages} />
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
`;

export default ChatPage;
