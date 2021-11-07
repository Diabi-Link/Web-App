/* eslint-disable import/no-cycle */
import React, { createContext, useReducer, useMemo, Dispatch } from 'react';

import { Icon } from 'react-icons-kit';
import { ActionMap } from '../../types/utilities';

export enum ContextActionTypes {
  SetNotice = 'SET_NOTICE',
}

export type NoticeType = {
  label: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  noticeStyle: 'success' | 'error' | 'info' | undefined;
  closeable?: Boolean;
  persistent?: Boolean;
  duration?: number;
  icon?: typeof Icon;
};

type ContextPayload = {
  [ContextActionTypes.SetNotice]: NoticeType;
};

export type ContextActions = ActionMap<ContextPayload>[keyof ActionMap<ContextPayload>];

type InitialStateType = {
  type: ContextActionTypes | null;
  noticeData: NoticeType;
  reset: boolean;
};

const initialState: InitialStateType = {
  type: null,
  noticeData: {
    label: 'notice',
    type: 'button',
    noticeStyle: undefined,
    closeable: false,
    persistent: false,
    duration: 0,
    icon: undefined,
  },
  reset: false,
};

const reducer = (
  state: InitialStateType,
  action: ContextActions,
): InitialStateType => {
  switch (action.type) {
    case ContextActionTypes.SetNotice:
      return {
        type: action.type,
        noticeData: action.payload,
        reset: !state.reset,
      };

    default:
      return state;
  }
};

const MainContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ContextActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

type MainProviderType = {
  children: React.ReactNode;
};

const MainProvider: React.FC<MainProviderType> = ({
  children,
}: MainProviderType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export { MainProvider, MainContext };
