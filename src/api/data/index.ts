import { gql, MutationHookOptions, QueryHookOptions } from '@apollo/client';
import { DataType } from '../../types/data';
import { useAPIMutation, useAPILazyQuery } from '../handlers';

type GetDataResponse = {
  getData: [DataType];
};

type GetDataData = {
  from: Date;
  to: Date;
  userID: number;
};

const GET_DATA = gql`
  query getData($from: DateTime!, $to: DateTime!, $userID: Float!) {
    getData(from: $from, to: $to, UserID: $userID) {
      id
      value
      date
      userId
    }
  }
`;

export function useGetDataLazyQuery(
  options?: QueryHookOptions<GetDataResponse, GetDataData>,
) {
  return useAPILazyQuery(GET_DATA, options);
}

type GetDataOfResponse = {
  getDataOf: [DataType];
};

const GET_DATA_OF = gql`
  query getDataOf($from: DateTime!, $to: DateTime!, $userID: Float!) {
    getDataOf(from: $from, to: $to, UserID: $userID) {
      id
      value
      date
      userId
    }
  }
`;

export function useGetDataOfLazyQuery(
  options?: QueryHookOptions<GetDataOfResponse, GetDataData>,
) {
  return useAPILazyQuery(GET_DATA_OF, options);
}

type AddDataResponse = {
  AddData: { isLevelGood: boolean; message: string };
};

type AddDataData = {
  dataInfo: {
    value: number;
    date: Date;
  };
};

const ADD_DATA = gql`
  mutation AddData($dataInfo: DataInfo!) {
    AddData(Data_info: $dataInfo) {
      isLevelGood
      message
    }
  }
`;

export function useAddData(
  options?: MutationHookOptions<AddDataResponse, AddDataData>,
) {
  return useAPIMutation(ADD_DATA, options);
}
