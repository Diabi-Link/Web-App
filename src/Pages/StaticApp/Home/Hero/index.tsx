import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { appleinc, android } from 'react-icons-kit/icomoon/';

import AppMockup from '../../../../assets/pngs/AppMockup.png';

import { Heading } from '../../../../ui/Heading';
import Button from '../../../../ui/Button';

const Hero = () => {
  const { t } = useTranslation();
  const { push } = useHistory();

  return (
    <HeroContainer>
      <InfoWrapper>
        <Title level={1}>{t('Hero.Title')}</Title>
        <Content level={3}>{t('Hero.Subtitle')}</Content>
        <AppWrapper>
          <Content level={3}>{t('Hero.Download')}</Content>
          <ButtonWrapper>
            <NavButton
              label={t('Hero.AppStore')}
              btnStyle="white"
              iconStart={appleinc}
              onClick={() => push('/')}
              data-testid="appstore-button"
            />
            <NavButton
              label={t('Hero.PlayStore')}
              btnStyle="white"
              iconStart={android}
              onClick={() => push('/')}
              data-testid="playstore-button"
            />
          </ButtonWrapper>
        </AppWrapper>
      </InfoWrapper>
      <ImgWrapper>
        <img src={AppMockup} alt="AppMockup" />
      </ImgWrapper>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 800px;
  position: relative;

  @media (orientation: portrait) {
    flex-direction: column-reverse;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  width: 65vw;
  padding: 2rem;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 35vw;

  @media (orientation: portrait) {
    display: none;
  }

  & > img {
    width: 100%;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  align-items: center;

  @media (min-width: 1024px) {
    align-items: flex-start;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;

  margin: 2rem 0;

  & > button {
    margin: 0 2rem 0 0;
  }

  @media (orientation: portrait) and (max-width: 600px) {
    flex-direction: column;
    margin: 0;

    & > button {
      margin: 1rem 0rem 0 0;
    }
  }
`;

const Title = styled(Heading)`
  font-size: 1.7rem;
  text-align: center;

  @media (min-width: 1024px) {
    text-align: left;
    font-size: 2.5rem;
  }
`;

const Content = styled(Heading)`
  font-weight: 500;
  font-size: 0.8rem;
  text-align: justify;

  @media (min-width: 600px) {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const NavButton = styled(Button)`
  width: 130px;
  height: 40px;
`;

export default Hero;
