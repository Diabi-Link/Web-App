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
import { Dispatch, useContext } from 'react';
import {
  MainContext,
  ContextActions,
  ContextActionTypes,
} from '../contexts/MainContext';

type OperationVariables = Record<string, any>;

const onErrorShared = (
  error: ApolloError,
  altDispatch: Dispatch<ContextActions>,
) => {
  const { graphQLErrors, networkError } = error;

  if (graphQLErrors) {
    graphQLErrors.forEach((err) => {
      if (err.message) {
        altDispatch({
          type: ContextActionTypes.SetNotice,
          payload: {
            label: err.message,
            noticeStyle: 'red',
            persistent: false,
            closeable: true,
            duration: 5000,
          },
        });
      } else {
        altDispatch({
          type: ContextActionTypes.SetNotice,
          payload: {
            label: 'Unexpected error',
            noticeStyle: 'red',
            persistent: false,
            closeable: true,
            duration: 5000,
          },
        });
      }
    });
  }
  if (networkError) {
    if (networkError.message) {
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: networkError.message,
          noticeStyle: 'red',
          persistent: false,
          closeable: true,
          duration: 5000,
        },
      });
    } else {
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: 'Unexpected error',
          noticeStyle: 'red',
          persistent: false,
          closeable: true,
          duration: 5000,
        },
      });
    }
  }
};

export function useAPIQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>,
): QueryResult<TData, TVariables> {
  const { dispatch: altDispatch } = useContext(MainContext);

  const onError = (error: ApolloError) => {
    onErrorShared(error, altDispatch);
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
  const { dispatch: altDispatch } = useContext(MainContext);

  const onError = (error: ApolloError) => {
    onErrorShared(error, altDispatch);
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
  const { dispatch: altDispatch } = useContext(MainContext);

  const onError = (error: ApolloError) => {
    onErrorShared(error, altDispatch);
    if (options?.onError) {
      options.onError(error);
    }
  };

  return useMutation<TData, TVariables>(mutation, { ...options, onError });
}
