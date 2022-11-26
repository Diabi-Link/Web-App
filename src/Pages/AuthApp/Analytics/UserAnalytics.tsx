import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';
import Icon from 'react-icons-kit';
import HypoGraph from './HypoGraph';
import DailyGraph from './DailyGraph';
import TimeInTargetGraph from './TimeInTargetGraph';
import { ReactComponent as ProfilePatient } from '../../../assets/svgs/ProfilePatient.svg';

import { UserType } from '../../../types/user';
import { PageTitle } from '../../../ui/Heading';
import { PictureContext } from '../../../contexts/PictureContext';
import Loader from '../../../ui/Loader';

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
  const { picture, pictureLoading } = useContext(PictureContext);

  return (
    <Container data-testid="auth-analytics-page">
      <Wrapper>
        <PageTitle level={1}>{t('Analytics.Title')}</PageTitle>
        {userAccount === 'medicalProfessional' && (
          <BackWrapper onClick={() => setUserAnalytics(undefined)}>
            <ArrowBack icon={arrowLeft2} size={20} />
            <Text>Retour</Text>
          </BackWrapper>
        )}
        <AccountWrapper>
          {userAccount !== 'patient' && (
            <AvatarWrapper>
              <ProfilePatient />
            </AvatarWrapper>
          )}
          {userAccount === 'patient' && (
            <>
              {pictureLoading && (
                <LoaderContainer>
                  <Loader />
                </LoaderContainer>
              )}
              {!pictureLoading && !picture && (
                <AvatarWrapper>
                  <ProfilePatient />
                </AvatarWrapper>
              )}
              {!pictureLoading && picture !== null && (
                <ImgWrapper alt="profil-picture" src={picture} />
              )}
            </>
          )}
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

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const ImgWrapper = styled.img`
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
