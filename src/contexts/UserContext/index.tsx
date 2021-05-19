import React, { createContext, useReducer, useMemo, Dispatch } from 'react';

import { ActionMap } from '../../types/utilities';
import { UserType } from '../../types/user';

export enum UserActionTypes {
  signUp = 'USER_SIGN_UP',
}

type UserPayload = {
  [UserActionTypes.signUp]: UserType;
};

type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

type InitialStateType = {
  type: UserActionTypes | null;
  user: UserType | null;
};

const initialState: InitialStateType = {
  type: null,
  user: null,
};

const reducer = (
  state: InitialStateType,
  action: UserActions,
): InitialStateType => {
  switch (action.type) {
    case UserActionTypes.signUp:
      return { type: action.type, user: action.payload };
    default:
      return state;
  }
};

const UserContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<UserActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

type UserProviderType = {
  children: React.ReactNode;
};

const UserProvider: React.FC<UserProviderType> = ({
  children,
}: UserProviderType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
