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
  const { graphQLErrors, networkError } = error;

  if (graphQLErrors) {
    graphQLErrors.forEach((err) => console.log(err.message));
  }
  if (networkError) {
    logout();

    // if ('statusCode' in networkError && networkError.statusCode === 401) {
    //   removeAuthToken();
    // }
  }
};

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
