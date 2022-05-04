import React, { useContext, useEffect } from 'react';
import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import {
  useCollection,
  useCollectionData,
} from 'react-firebase-hooks/firestore';
import styled from 'styled-components';

import { UserContext } from '../../../contexts/UserContext';
import firestore from '../../../firebase';
import { ChatContext } from '../../../contexts/ChatContext';
import Discussion from './Discussion';
import Footer from './Footer';
import Header from './Header';

const ChatPage = (): React.ReactElement => {
  const { chatUserType } = useContext(ChatContext);
  const {
    state: { user },
  } = useContext(UserContext);

  const userIds = [
    [`${user?.id}`, `${chatUserType?.id}`],
    [`${chatUserType.id}`, `${user?.id}`],
  ];

  const collectionFirestore = collection(firestore, 'Conversations');

  const [conversation, loadingConversation] = useCollection(
    query(collectionFirestore, where('userIds', 'in', userIds)),
  );

  const collectionMessages = collection(
    firestore,
    `Conversations/${conversation?.docs[0]?.id}/Messages`,
  );

  const [messages] = useCollectionData(
    conversation?.docs[0]?.id !== undefined
      ? query(collectionMessages, orderBy('sendAt'))
      : undefined,
  );

  const createConv = async () => {
    if (user?.id && chatUserType.id) {
      setDoc(doc(collectionFirestore), {
        userIds:
          user.id > chatUserType.id
            ? [`${chatUserType.id}`, `${user.id}`]
            : [`${user.id}`, `${chatUserType.id}`],
      });
    }
  };

  const addMessage = async (text: string) => {
    if (user?.id && collectionMessages) {
      setDoc(
        doc(collectionFirestore, conversation?.docs[0]?.id),
        {
          lastMessageTimestamp: Date.now(),
        },
        { merge: true },
      );
      setDoc(doc(collectionMessages), {
        sendAt: Date.now(),
        text,
        userId: user.id,
      });
    }
  };

  useEffect(() => {
    if (!loadingConversation && conversation?.docs[0]?.id === undefined)
      createConv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, chatUserType.id, loadingConversation]);

  return (
    <Container data-testid="auth-chat-page">
      <Header {...chatUserType} />
      <Discussion messages={messages} userId={user?.id} />
      <Footer addMessage={addMessage} />
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default ChatPage;
