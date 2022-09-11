import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { ReactComponent as InstantMessagingSvg } from '../../../../assets/svgs/InstantMessaging.svg';
import { ReactComponent as AnalyticsToolsSvg } from '../../../../assets/svgs/AnalyticsTools.svg';
import { ReactComponent as AlertsSvg } from '../../../../assets/svgs/Alerts.svg';

import Heading from '../../../../ui/Heading';

const Services = () => {
  const { t } = useTranslation();
  return (
    <ServicesContainer id="services">
      <ServicesWrapper>
        <Title level={1}>{t('Services.Title')}</Title>
        <ServicesListWrapper>
          <ServiceBox>
            <InstantMessagingSvg />
            <Heading level={2}>{t('Services.InstantMessaging')}</Heading>
            <Content level={3}>{t('Services.InstantMessagingDesc')}</Content>
          </ServiceBox>
          <ServiceBox>
            <AnalyticsToolsSvg />
            <Heading level={2}>{t('Services.Follow-Up')}</Heading>
            <Content level={3}>{t('Services.Follow-UpDesc')}</Content>
          </ServiceBox>
          <ServiceBox>
            <AlertsSvg />
            <Heading level={2}>{t('Services.Alerts')}</Heading>
            <Content level={3}>{t('Services.AlertsDesc')}</Content>
          </ServiceBox>
        </ServicesListWrapper>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

const ServicesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 5rem;

  @media (orientation: portrait) and (max-width: 600px) {
    flex-direction: column;
    padding: 2rem;
  }
`;

const ServicesWrapper = styled.div`
  color: white;
  width: 90vw;
`;

const ServicesListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (orientation: portrait) and (max-width: 600px) {
    justify-content: center;
    & > div {
      width: 90%;
      margin: 2rem 0;
    }
  }
`;

const ServiceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 15rem;
  width: 30%;
`;

const Title = styled(Heading)`
  position: relative;

  &:before {
    content: '';
    height: 2.5px;
    width: 8rem;
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
  }
  font-size: 2.2rem;
  margin-bottom: 6rem;
`;

const Content = styled(Heading)`
  font-weight: 600;
  font-size: 0.9rem;
`;

export default Services;
