import { gql, MutationHookOptions } from '@apollo/client';
import { useAPIMutation } from '../handlers';

type AddDataResponse = {
  AddData: { value: number };
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
      value
    }
  }
`;

export function useAddData(
  options?: MutationHookOptions<AddDataResponse, AddDataData>,
) {
  return useAPIMutation(ADD_DATA, options);
}
