import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { appleinc, android } from 'react-icons-kit/icomoon/';

import { ReactComponent as AppMockupSvg } from '../../../../assets/svgs/AppMockup.svg';

import Heading from '../../../../ui/Heading';
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
        <AppMockupSvg />
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
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;

const ButtonWrapper = styled.div`
  display: flex;

  margin: 2rem 0;

  & > button {
    margin: 0 2rem 0 0;
  }

  @media (orientation: portrait) {
    margin: 0;

    & > button {
      margin: 1rem 1rem 0 0;
    }
  }
`;

const Title = styled(Heading)`
  font-size: 2.5rem;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 2.2rem;
  }
`;

const Content = styled(Heading)`
  font-weight: 600;
`;

const NavButton = styled(Button)`
  width: 130px;
  height: 40px;
`;

export default Hero;
