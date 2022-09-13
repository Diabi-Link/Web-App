import {
  gql,
  QueryHookOptions,
  // SubscriptionHookOptions,
  // useSubscription,
} from '@apollo/client';
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
      userId
      message
      timestamp
      flag
    }
  }
`;

export function useGetAlertsLazyQuery(
  options?: QueryHookOptions<GetAlertsResponse, GetAlertsData>,
) {
  return useAPILazyQuery(GET_ALERTS, options);
}

// type GetNotifResponse = {
//   listenToSubscription: [NotificationType];
// };

// type GetNotifData = {};

// const GET_NOTIF = gql`
//   subscription listenToSubscription {
//     listenToSubscription(topics: "40|3") {
//       message
//       timestamp
//       userId
//       flag
//     }
//   }
// `;

// export function useGetNotif(
//   options?: SubscriptionHookOptions<GetNotifResponse, GetNotifData>,
// ) {
//   return useSubscription(GET_NOTIF, options);
// }
