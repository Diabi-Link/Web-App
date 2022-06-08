import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../../contexts/UserContext';
import { useGetContact } from '../../../api';
import UserAnalytics from './UserAnalytics';
import PatientChoice from './PatientChoice';
import { UserType } from '../../../types/user';

const Analytics = (): JSX.Element => {
  const {
    state: { user },
  } = useContext(UserContext);
  const [userAnalytics, setUserAnalytics] = useState<UserType | undefined>(
    undefined,
  );

  const { data: contacts } = useGetContact({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (user) {
      if (user.account === 'patient') setUserAnalytics(user);
      if (user.account === 'referent' && contacts)
        setUserAnalytics(contacts?.Me.contact[0]);
    }
  }, [user, contacts]);

  return !userAnalytics && user?.account === 'medicalProfessional' ? (
    <PatientChoice
      contacts={contacts?.Me.contact?.filter((c) => c.account === 'patient')}
      setUserAnalytics={setUserAnalytics}
    />
  ) : (
    <UserAnalytics
      user={userAnalytics}
      userAccount={user?.account}
      setUserAnalytics={setUserAnalytics}
    />
  );
};

export default Analytics;
