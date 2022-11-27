import { gql, MutationHookOptions } from '@apollo/client';
import { useAPIMutation } from '../handlers';

type AddSubscribeResponse = {
  AddSubscribe: { id: string; paymentUrl: string };
};

type AddSubscribeData = {
  subsType: string;
};

const ADD_SUBSCRIBE = gql`
  mutation AddSubscribe($subsType: String!) {
    AddSubscribe(subsType: $subsType) {
      id
      paymentUrl
    }
  }
`;

export function useAddSubscribe(
  options?: MutationHookOptions<AddSubscribeResponse, AddSubscribeData>,
) {
  return useAPIMutation(ADD_SUBSCRIBE, options);
}

type RemoveSubscribeResponse = {
  removeSubscribe: {};
};

type RemoveSubscribeData = {
  ProductSub: string;
};

const REMOVE_SUBSCRIBE = gql`
  mutation removeSubscribe($ProductSub: String!) {
    removeSubscribe(ProductSub: $ProductSub)
  }
`;

export function useRemoveSubscribe(
  options?: MutationHookOptions<RemoveSubscribeResponse, RemoveSubscribeData>,
) {
  return useAPIMutation(REMOVE_SUBSCRIBE, options);
}
