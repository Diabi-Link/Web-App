import { gql, QueryHookOptions } from '@apollo/client';
import { NotificationType } from '../../types/notification';
import { useAPILazyQuery } from '../handlers';

type GetAlertsResponse = {
  getAlertHistory: [NotificationType];
};

type GetAlertsData = {
  from: Date;
  to: Date;
  userID: number;
};

const GET_ALERTS = gql`
  query getAlertHistory($from: DateTime!, $to: DateTime!, $userID: Float!) {
    getAlertHistory(from: $from, to: $to, UserID: $userID) {
      ID_User
      Message
      Timestamp
      Flag
    }
  }
`;

export function useGetAlertsLazyQuery(
  options?: QueryHookOptions<GetAlertsResponse, GetAlertsData>,
) {
  return useAPILazyQuery(GET_ALERTS, options);
}
