import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { search } from 'react-icons-kit/fa/search';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';
import { useHistory } from 'react-router-dom';
import {
  useCollection,
  useCollectionData,
} from 'react-firebase-hooks/firestore';
import {
  collection,
  DocumentData,
  limitToLast,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import Heading from '../../../../../ui/Heading';
import { avatars } from '../../../../../utils/avatars';
import { ChatContext } from '../../../../../contexts/ChatContext';
import { ChatUserType } from '../../../../../types/chat';
import { DeepNonNullable } from '../../../../../types/utilities';
import { useFetchUserLazyQuery } from '../../../../../api';
import firestore from '../../../../../firebase';
import { UserContext } from '../../../../../contexts/UserContext';

type DrawerChatProps = {
  setChatOn: Dispatch<SetStateAction<boolean>>;
  chatOn: boolean;
};

type ChatContactProps = {
  selected: boolean;
  setSelected: Dispatch<ChatUserType>;
  conversation?: QueryDocumentSnapshot<DocumentData>;
  visible: boolean;
} & DeepNonNullable<ChatUserType>;

const ChatContact = ({
  firstName,
  lastName,
  account,
  selected,
  setSelected,
  id,
  conversation,
  visible,
}: ChatContactProps) => {
  const { i18n } = useTranslation();
  const collectionMessages = collection(
    firestore,
    `Conversations/${conversation?.id}/Messages`,
  );

  const [lastMessage, loading] = useCollectionData(
    conversation?.id !== undefined
      ? query(collectionMessages, orderBy('sendAt'), limitToLast(1))
      : undefined,
  );

  const sendAtToText = (sendAt: Date) => {
    const todayDate = new Date().toLocaleDateString(i18n.language, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const date = new Date(sendAt).toLocaleDateString(i18n.language, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const time = new Date(sendAt).toLocaleTimeString(i18n.language, {
      hour: '2-digit',
      minute: '2-digit',
    });
    if (todayDate !== date) {
      const today = new Date();
      const msgDate = new Date(sendAt);
      const utc1 = Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      const utc2 = Date.UTC(
        msgDate.getFullYear(),
        msgDate.getMonth(),
        msgDate.getDate(),
      );
      return `${Math.ceil(Math.abs(utc2 - utc1) / (1000 * 60 * 60 * 24))}j.`;
    }
    return time;
  };

  return (
    <ChatContactWrapper
      selected={selected}
      onClick={() => setSelected({ lastName, firstName, account, id })}
      visible={visible}
    >
      <AvatarWrapper>{avatars[account].svg}</AvatarWrapper>
      <InfoWrapper>
        <NameWrapper>
          {firstName} {lastName}
        </NameWrapper>
        <LastMessageWrapper>
          {lastMessage && lastMessage[0] && (
            <>
              <LastMessage>
                {lastMessage[0].userId === id ? firstName : 'Vous'}:{' '}
                {lastMessage[0].text}
              </LastMessage>
              <SendAt>{sendAtToText(lastMessage[0].sendAt)}</SendAt>
            </>
          )}
          {(!lastMessage || !lastMessage[0]) && !loading && <>Pas de message</>}
        </LastMessageWrapper>
      </InfoWrapper>
    </ChatContactWrapper>
  );
};

const DrawerChat = ({ setChatOn, chatOn }: DrawerChatProps) => {
  const history = useHistory();
  const {
    state: { user },
  } = useContext(UserContext);
  const [contacts, setContacts] = useState<DeepNonNullable<ChatUserType>[]>([]);
  const [orderedContacts, setOrderedContacts] = useState<
    DeepNonNullable<ChatUserType>[]
  >([]);
  const invisibles = useRef<number[]>([]);
  const [value, setValue] = useState('');
  const { chatUserType, setChatUserType } = useContext(ChatContext);
  const [fetchUser] = useFetchUserLazyQuery({
    onCompleted: (payload) => {
      const newContacts = payload.Me.contact;

      setContacts(newContacts);
    },
    fetchPolicy: 'network-only',
  });

  const collectionFirestore = collection(firestore, 'Conversations');
  const [conversations] = useCollection(
    query(
      collectionFirestore,
      where('userIds', 'array-contains', `${user?.id}`),
    ),
  );

  const orderByLastMessageTimestamp = (a: ChatUserType, b: ChatUserType) => {
    const aConv = conversations?.docs.find((doc) =>
      doc.data()?.userIds.includes(a.id),
    );
    const bConv = conversations?.docs.find((doc) =>
      doc.data()?.userIds.includes(b.id),
    );

    if (!bConv || !bConv.data()?.lastMessageTimestamp) {
      return -1;
    }
    if (!aConv || !aConv?.data()?.lastMessageTimestamp) {
      return 1;
    }
    return (
      bConv.data().lastMessageTimestamp - aConv.data().lastMessageTimestamp
    );
  };

  useEffect(() => {
    if (
      contacts.length > 0 &&
      conversations?.docs &&
      conversations.docs.length > 0
    ) {
      const newOrderedContacts = [...contacts];
      newOrderedContacts.sort(orderByLastMessageTimestamp);
      setOrderedContacts(newOrderedContacts);
      if (!chatUserType) setChatUserType(newOrderedContacts[0]);
    } else if (
      contacts.length > 0 &&
      !(conversations?.docs && conversations.docs.length > 0)
    ) {
      setOrderedContacts(contacts);
      setChatUserType(contacts[0]);
    }
  }, [conversations, contacts]);

  useEffect(() => {
    if (chatOn) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatOn]);

  const searchContact = ({
    target: { value: newValue },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (newValue !== '') {
      const newContactsIdx: number[] = [];

      contacts.forEach((contact, idx) => {
        if (
          contact.firstName
            .toLocaleLowerCase()
            .match(newValue.toLocaleLowerCase()) === null &&
          contact.lastName
            .toLocaleLowerCase()
            .match(newValue.toLocaleLowerCase()) === null
        ) {
          newContactsIdx.push(idx);
        }
      });
      invisibles.current = newContactsIdx;
    } else {
      invisibles.current = [];
    }
    setValue(newValue);
  };

  return (
    <DrawerWrapper>
      <HeaderWrapper>
        <ArrowBack
          icon={arrowLeft2}
          size={28}
          onClick={() => {
            setChatOn(false);
            history.go(-1);
          }}
        />
        <Heading level={2}>Discussions</Heading>
      </HeaderWrapper>
      <InputWrapper>
        <SearchIcon icon={search} size={20} />
        <StyledInput
          name="search"
          type="text"
          value={value}
          onChange={searchContact}
          placeholder="Rechercher un contact"
        />
      </InputWrapper>
      <ChatContactContainer>
        {orderedContacts.map((contact, idx) => (
          <ChatContact
            {...contact}
            selected={
              chatUserType.lastName === contact.lastName &&
              chatUserType.firstName === contact.firstName
            }
            setSelected={setChatUserType}
            conversation={conversations?.docs.find((doc) =>
              doc.data()?.userIds.includes(contact.id),
            )}
            visible={!invisibles.current.includes(idx)}
            key={contact.id}
          />
        ))}
      </ChatContactContainer>
    </DrawerWrapper>
  );
};

// React.ChangeEvent<HTMLInputElement>

const DrawerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
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
  /* border-bottom: ${({ theme }) => `solid 1px ${theme.main.grayLighter}`}; */
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  background-color: ${({ theme }) => theme.main.whiteBroken};
`;

const StyledInput = styled.input`
  border: none;
  height: 45px;
  padding: 0 10px;
  border-radius: 20px;
  background-color: transparent;
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.main.dark};
  &:placeholder {
    color: ${(props) => props.theme.main.gray};
  }
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(Icon)`
  margin-left: 28px;
  color: ${({ theme }) => theme.main.primary};
`;

const ChatContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const ChatContactWrapper = styled.div<{ selected: boolean; visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  align-items: center;
  width: 97%;
  border-radius: 15px;
  margin-bottom: 5px;
  padding: 13px 10px;
  cursor: pointer;
  background-color: ${({ theme, selected }) =>
    selected ? theme.main.whiteBroken : 'transparent'};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.main.whiteBroken};
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.main.primaryLight};
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  max-width: 140px;
  white-space: nowrap;
`;

const NameWrapper = styled.p`
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
`;

const LastMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0 0 0;
  font-size: 14px;
  height: 18px;
  color: ${({ theme }) => theme.main.grayDark};
`;

const LastMessage = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
`;

const SendAt = styled.p`
  margin-left: 8px;
`;

export default DrawerChat;
