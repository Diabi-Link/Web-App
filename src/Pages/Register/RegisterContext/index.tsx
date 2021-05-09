import React, { createContext, useReducer, useMemo, Dispatch } from 'react';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum RegisterActionTypes {
  UpdateUser = 'REGISTER_UPDATE_USER',
  UpdateAccount = 'REGISTER_UPDATE_ACCOUNT_TYPE',
  UpdateInfo = 'REGISTER_UPDATE_INFO_TYPE',
}

export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date | null;
};

export type AccountType = 'diabetic' | 'referent' | 'medicalProfessional';

type InfoType = {
  step: number;
};

type RegisterPayload = {
  [RegisterActionTypes.UpdateUser]: UserType;
  [RegisterActionTypes.UpdateAccount]: AccountType;
  [RegisterActionTypes.UpdateInfo]: InfoType;
};

type RegisterActions = ActionMap<RegisterPayload>[keyof ActionMap<RegisterPayload>];

type InitialStateType = {
  type: RegisterActionTypes | null;
  user: UserType;
  account: AccountType | null;
  info: InfoType;
};

const initialState: InitialStateType = {
  type: null,
  user: { firstName: '', lastName: '', email: '', birthDate: null },
  account: null,
  info: { step: 1 },
};

const reducer = (
  state: InitialStateType,
  action: RegisterActions,
): InitialStateType => {
  switch (action.type) {
    case RegisterActionTypes.UpdateUser:
      return {
        ...state,
        type: action.type,
        user: { ...state.user, ...action.payload },
      };

    case RegisterActionTypes.UpdateAccount:
      return {
        ...state,
        type: action.type,
        account: action.payload,
      };

    case RegisterActionTypes.UpdateInfo:
      return {
        ...state,
        type: action.type,
        info: action.payload,
      };

    default:
      return state;
  }
};

const RegisterContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<RegisterActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

type RegisterProviderType = {
  children: React.ReactNode;
};

const RegisterProvider: React.FC<RegisterProviderType> = ({
  children,
}: RegisterProviderType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterProvider, RegisterContext };
