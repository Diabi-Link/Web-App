import React, {
  createContext,
  useReducer,
  useMemo,
  Dispatch,
  useContext,
} from 'react';

import { ActionMap } from '../../types/utilities';
import { UserType } from '../../types/user';
import { AuthContext } from '../AuthContext';

export enum UserActionTypes {
  FetchUser = 'FETCH_USER',
  EmptyUser = 'EMPTY_USER',
}

type UserPayload = {
  [UserActionTypes.FetchUser]: UserType;
  [UserActionTypes.EmptyUser]: undefined;
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
    case UserActionTypes.FetchUser:
      return {
        type: action.type,
        user: {
          ...action.payload,
          birthDate: new Date(action.payload.birthDate),
        },
      };

    case UserActionTypes.EmptyUser:
      return { type: action.type, user: initialState.user };

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
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(
    reducer,
    user
      ? {
          type: UserActionTypes.FetchUser,
          user: { ...user, birthDate: new Date(user.birthDate) },
        }
      : initialState,
  );
  const value = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
