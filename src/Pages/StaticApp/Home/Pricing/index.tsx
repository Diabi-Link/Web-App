import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { ReactComponent as PatientSvg } from '../../../../assets/svgs/PatientPrice.svg';
import { ReactComponent as ReferentSvg } from '../../../../assets/svgs/ReferentPrice.svg';
import { ReactComponent as ProfessionalSvg } from '../../../../assets/svgs/ProfessionalPrice.svg';

import { Heading } from '../../../../ui/Heading';

const Pricing = () => {
  const { t } = useTranslation();

  return (
    <PricingContainer id="pricing">
      <Title level={1}>{t('Pricing.Title')}</Title>
      <PricingWrapper>
        <PatientSvg />
        <ReferentSvg />
        <ProfessionalSvg />
      </PricingWrapper>
    </PricingContainer>
  );
};

const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: justify;
  color: ${({ theme }) => theme.main.primary};
  background: ${({ theme }) => theme.main.whiteBroken};
  position: relative;
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
    background-color: ${({ theme }) => theme.main.primaryLight};
  }
  margin-bottom: 3rem;
  font-size: 1.5rem;
  text-align: center;

  @media (min-width: 600px) {
    margin-bottom: 6rem;
    font-size: 2.5rem;
  }
`;

const PricingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > svg {
    margin: 1rem;
  }

  @media (min-width: 900px) {
    flex-direction: row;
    & > svg {
      margin: 0 2rem;
    }
  }
`;
export default Pricing;
