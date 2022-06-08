import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';
import Icon from 'react-icons-kit';
import HypoGraph from './HypoGraph';
import DailyGraph from './DailyGraph';
import TimeInTargetGraph from './TimeInTargetGraph';
import { ReactComponent as ProfilePatient } from '../../../assets/svgs/ProfilePatient.svg';

import { UserType } from '../../../types/user';

const UserAnalytics = ({
  user,
  userAccount,
  setUserAnalytics,
}: {
  user?: UserType | null;
  userAccount?: UserType['account'];
  setUserAnalytics: React.Dispatch<React.SetStateAction<UserType | undefined>>;
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Container data-testid="auth-analytics-page">
      <Wrapper>
        <TitleWrapper>
          <Line />
          <SectionTitle>{t('Analytics.Title')}</SectionTitle>
          <Line />
        </TitleWrapper>
        {userAccount === 'medicalProfessional' && (
          <BackWrapper onClick={() => setUserAnalytics(undefined)}>
            <ArrowBack icon={arrowLeft2} size={20} />
            <Text>Retour</Text>
          </BackWrapper>
        )}
        <AccountWrapper>
          <AvatarWrapper>
            <ProfilePatient />
          </AvatarWrapper>
          <UserDesc>
            {user && user.firstName} {user && user.lastName}
          </UserDesc>
        </AccountWrapper>
        <TopWrapper>
          <TimeInTargetGraph userAccount={userAccount} user={user} />
          <HypoGraph userAccount={userAccount} user={user} />
        </TopWrapper>
        <BottomWrapper>
          <DailyGraph userAccount={userAccount} user={user} />
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
  margin-top: 30px;

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

const ArrowBack = styled(Icon)`
  color: ${({ theme }) => theme.main.primary};
`;

const BackWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-left: 20px;
  cursor: pointer;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  padding: 0px 10px;
  color: ${(props) => props.theme.main.primary};
`;

export default UserAnalytics;
