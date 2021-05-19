import React, {
  createContext,
  useReducer,
  useMemo,
  Dispatch,
  useEffect,
} from 'react';
import { useLocation, useHistory } from 'react-router-dom';

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

export type AccountType = 'patient' | 'referent' | 'medicalProfessional';

export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date | null;
  account: AccountType;
};

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
  info: InfoType;
};

const initialState: InitialStateType = {
  type: null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: null,
    account: 'patient',
  },
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
  const location = useLocation();
  const history = useHistory();

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  useEffect(() => {
    if (!location.pathname.endsWith('/register/user')) {
      history.push('/register/user');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterProvider, RegisterContext };
