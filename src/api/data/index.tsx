import { gql, MutationHookOptions } from '@apollo/client';
import { useAPIMutation } from '../handlers';

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
