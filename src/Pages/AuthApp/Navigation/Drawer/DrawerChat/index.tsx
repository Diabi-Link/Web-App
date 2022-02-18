import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { search } from 'react-icons-kit/fa/search';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';
import { useHistory } from 'react-router-dom';
import Heading from '../../../../../ui/Heading';
import { avatars } from '../../../../../utils/avatars';
import { ChatContext } from '../../../../../contexts/ChatContext';
import { ChatUserType } from '../../../../../types/chat';
import { DeepNonNullable } from '../../../../../types/utilities';

type DrawerChatProps = {
  setChatOn: Dispatch<SetStateAction<boolean>>;
};

type ChatContactProps = {
  selected: boolean;
  setSelected: Dispatch<ChatUserType>;
} & DeepNonNullable<ChatUserType>;

const contacts: DeepNonNullable<ChatUserType[]> = [
  { firstName: 'Nicolas', lastName: 'Carrasco', account: 'referent' },
  {
    firstName: 'Djhahid',
    lastName: 'Bousba',
    account: 'medicalProfessional',
  },
  {
    firstName: 'Thibault',
    lastName: 'Schmitt',
    account: 'medicalProfessional',
  },
  { firstName: 'John', lastName: 'Doe', account: 'medicalProfessional' },
  {
    firstName: 'John',
    lastName: 'TooLongNameeeeeeeeee',
    account: 'medicalProfessional',
  },
];

contacts.sort((a, b) =>
  // eslint-disable-next-line no-nested-ternary
  a.lastName > b.lastName ? 1 : b.lastName > a.lastName ? -1 : 0,
);

const ChatContact = ({
  firstName,
  lastName,
  account,
  selected,
  setSelected,
}: ChatContactProps) => {
  return (
    <ChatContactWrapper
      selected={selected}
      onClick={() => setSelected({ lastName, firstName, account })}
    >
      <AvatarWrapper>{avatars[account].svg}</AvatarWrapper>
      <NameWrapper>
        {firstName} {lastName}
      </NameWrapper>
    </ChatContactWrapper>
  );
};

const DrawerChat = ({ setChatOn }: DrawerChatProps) => {
  const history = useHistory();
  const [visibleContact, setVisibleContact] = useState(contacts);
  const [value, setValue] = useState('');
  const { chatUserType, setChatUserType } = useContext(ChatContext);

  useEffect(() => {
    setChatUserType(contacts[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchContact = ({
    target: { value: newValue },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (newValue !== '') {
      const newContacts: DeepNonNullable<ChatUserType[]> = [];

      contacts.forEach((contact) => {
        if (
          contact.firstName
            .toLocaleLowerCase()
            .match(newValue.toLocaleLowerCase()) !== null ||
          contact.lastName
            .toLocaleLowerCase()
            .match(newValue.toLocaleLowerCase()) !== null
        ) {
          newContacts.push(contact);
        }
      });

      setVisibleContact(newContacts);
    } else {
      setVisibleContact(contacts);
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
        {visibleContact.map((contact) => (
          <ChatContact
            {...contact}
            selected={
              chatUserType.lastName === contact.lastName &&
              chatUserType.firstName === contact.firstName
            }
            setSelected={setChatUserType}
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

const ChatContactWrapper = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  width: 97%;
  border-radius: 15px;
  margin-bottom: 5px;
  padding: 10px;
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

const NameWrapper = styled.p`
  margin-left: 8px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 140px;
`;

export default DrawerChat;
