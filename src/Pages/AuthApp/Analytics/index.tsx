import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import HypoGraph from './HypoGraph';
import DailyGraph from './DailyGraph';
import TimeInTargetGraph from './TimeInTargetGraph';

import { ReactComponent as ProfilePatient } from '../../../assets/svgs/ProfilePatient.svg';
import { ReactComponent as ProfileMP } from '../../../assets/svgs/ProfileMP.svg';
import { ReactComponent as ProfileReferent } from '../../../assets/svgs/ProfileReferent.svg';

import { UserContext } from '../../../contexts/UserContext';

const Analytics = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    state: { user },
  } = useContext(UserContext);

  const avatars = {
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
  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Line />
          <SectionTitle>{t('Analytics.Title')}</SectionTitle>
          <Line />
        </TitleWrapper>
        <AccountWrapper>
          <AvatarWrapper>{user && avatars[user.account].svg}</AvatarWrapper>
          <UserDesc>
            {user && user.firstName} {user && user.lastName}
          </UserDesc>
        </AccountWrapper>
        <TopWrapper>
          <TimeInTargetGraph />
          <HypoGraph />
        </TopWrapper>
        <BottomWrapper>
          <DailyGraph />
        </BottomWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100vw;
  height: 100vh;

  @media (min-width: 1024px) and (orientation: landscape) {
    justify-content: center;
    width: 85vw;
  }
`;

const AccountWrapper = styled.div`
  display: flex;
  width: 92vw;

  @media (min-width: 768px) {
    width: 60vw;
  }

  @media (min-width: 1024px) and (orientation: landscape) {
    width: calc(71%);
    height: auto;
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.main.primaryLight};
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const UserDesc = styled.label`
  font-size: 22px;
  font-weight: 600;
  color: ${(props) => props.theme.main.dark};
  margin: auto 30px;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 92vw;

  @media (min-width: 768px) {
    width: 60vw;
  }

  @media (min-width: 1024px) and (orientation: landscape) {
    width: calc(71%);
    height: auto;
  }
`;

const SectionTitle = styled.label`
  display: flex;
  font-size: 30px;
  font-weight: 800;
  color: ${(props) => props.theme.main.primary};
  margin: 0px 15px;
`;

const Line = styled.div`
  margin: auto 0;
  border: 2px solid ${(props) => props.theme.main.primary};
  background-color: ${(props) => props.theme.main.primary};
  flex: 1;
  height: 1px;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 5px;

  & > div {
    margin: 10px;
  }

  @media (min-width: 1024px) and (orientation: landscape) {
    flex-direction: row;
    & > div {
      margin: 10px;
    }
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export default Analytics;
