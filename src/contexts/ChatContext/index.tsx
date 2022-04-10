import React, { Dispatch, useState } from 'react';
import { DeepNullable } from '../../types/utilities';
import { ChatUserType } from '../../types/chat';

const ChatContext = React.createContext<{
  chatUserType: ChatUserType;
  setChatUserType: Dispatch<ChatUserType>;
}>({
  chatUserType: {
    account: null,
    firstName: null,
    lastName: null,
    id: null,
  },
  setChatUserType: () => null,
});

type Props = {
  children: React.ReactElement;
};

const ChatProvider = ({ children }: Props): React.ReactElement => {
  const [chatUserType, setChatUserType] = useState<DeepNullable<ChatUserType>>({
    account: null,
    firstName: null,
    lastName: null,
    id: null,
  });

  return (
    <ChatContext.Provider value={{ chatUserType, setChatUserType }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatProvider, ChatContext };
