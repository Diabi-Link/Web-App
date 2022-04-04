import React from 'react';
import { ReactComponent as ProfilePatient } from '../assets/svgs/ProfilePatient.svg';
import { ReactComponent as ProfileMP } from '../assets/svgs/ProfileMP.svg';
import { ReactComponent as ProfileReferent } from '../assets/svgs/ProfileReferent.svg';

export const avatars = {
  patient: {
    svg: <ProfilePatient />,
  },
  medicalProfessional: {
    svg: <ProfileMP />,
  },
  referent: {
    svg: <ProfileReferent />,
  },
};
