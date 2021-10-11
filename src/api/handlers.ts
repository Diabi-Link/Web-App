/* eslint-disable no-console */
import {
  ApolloError,
  MutationHookOptions,
  MutationTuple,
  QueryHookOptions,
  QueryResult,
  QueryTuple,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client';
import { DocumentNode } from 'graphql';
import { useContext } from 'react';
import { UserActionTypes, UserContext } from '../contexts/UserContext';
import { useAuthToken } from '../hooks/useAuthToken';

type OperationVariables = Record<string, any>;

const onErrorShared = (error: ApolloError, logout: () => void) => {
  const { networkError } = error;

  if (networkError) {
    logout();
  }
};

// const test = async () => {
//   const refreshToken = localStorage.getItem('refreshToken');

//   const res = await fetch('https://diabilink.herokuapp.com/refreshToken', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': 'https://diabilink.herokuapp.com',
//     },
//     body: JSON.stringify({ refreshToken }),
//   });

//   console.log(res);
// };

export function useAPIQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>,
): QueryResult<TData, TVariables> {
  const { removeAuthToken } = useAuthToken();
  const { dispatch } = useContext(UserContext);

  const logout = () => {
    removeAuthToken();
    dispatch({ type: UserActionTypes.EmptyUser });
  };

  const onError = (error: ApolloError) => {
    onErrorShared(error, logout);
    if (options?.onError) {
      options.onError(error);
    }
  };

  return useQuery<TData, TVariables>(query, { ...options, onError });
}

export function useAPILazyQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>,
): QueryTuple<TData, TVariables> {
  const { removeAuthToken } = useAuthToken();
  const { dispatch } = useContext(UserContext);

  const logout = () => {
    removeAuthToken();
    dispatch({ type: UserActionTypes.EmptyUser });
  };

  const onError = (error: ApolloError) => {
    onErrorShared(error, logout);
    if (options?.onError) {
      options.onError(error);
    }
  };

  return useLazyQuery<TData, TVariables>(query, { ...options, onError });
}

export function useAPIMutation<TData = any, TVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>,
): MutationTuple<TData, TVariables> {
  const { removeAuthToken } = useAuthToken();
  const { dispatch } = useContext(UserContext);

  const logout = () => {
    removeAuthToken();
    dispatch({ type: UserActionTypes.EmptyUser });
  };

  const onError = (error: ApolloError) => {
    onErrorShared(error, logout);
    if (options?.onError) {
      options.onError(error);
    }
  };

  return useMutation<TData, TVariables>(mutation, { ...options, onError });
}
