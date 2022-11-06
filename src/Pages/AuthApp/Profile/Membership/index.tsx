/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';

import { ReactComponent as CheckIconSvg } from '../../../../assets/svgs/Check.svg';

import Button from '../../../../ui/Button';

type Props = {
  props: FormikProps<{
    email: string;
    firstName: string;
    lastName: string;
    birthDate: null;
    newPassword: string;
    confirmNewPassword: string;
    acutalPassword: string;
    phone: string;
  }>;
};

const Membership = ({ props }: Props) => {
  const { t } = useTranslation();

  const [active, setActive] = useState(true);

  return (
    <Wrapper>
      <SectionWrapper>
        <LineStart />
        <SectionTitle>{t('Profile.Membership')}</SectionTitle>
        <LineEnd />
      </SectionWrapper>

      <StyledBox>
        <InfoWrapper>
          <InfoLabel>{t('Profile.Status')}</InfoLabel>
          <InfoText active={active}>
            {active ? t('Profile.Active') : t('Profile.Inactive')}
            <CheckIconSvg />
          </InfoText>
        </InfoWrapper>
        <InfoWrapper>
          <InfoLabel>{t('Profile.ExpirationDate')}</InfoLabel>
          <InfoText active={active}>04/12/2022</InfoText>
        </InfoWrapper>
        <StyledButton
          // type="submit"
          label={t('Profile.StopMembership')}
          btnStyle="red"
          outlined
          data-testid="decline-button"
          // onClick={() => setIsOpen(false)}
        />
      </StyledBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  flex: 1;
`;

const SectionWrapper = styled.div`
  display: flex;
`;

const SectionTitle = styled.label`
  display: flex;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.main.primaryLight};
  margin: 15px;
`;

const LineStart = styled.div`
  margin: auto 0;
  border: 2px solid ${({ theme }) => theme.main.primaryLight};
  background-color: ${({ theme }) => theme.main.primaryLight};
  width: 10%;
  height: 1px;
`;

const LineEnd = styled.div`
  margin: auto 0;
  border: 2px solid ${({ theme }) => theme.main.primaryLight};
  background-color: ${({ theme }) => theme.main.primaryLight};
  flex: 1;
  height: 1px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`;

const InfoText = styled.text<{ active: boolean }>`
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 500;
  color: ${({ active, theme }) => (active ? theme.main.green : theme.main.red)};

  & > svg {
    margin-left: 1rem;
  }
`;

const InfoLabel = styled.label`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  padding: 1rem;
  height: 80%;
  border-radius: 10px;
  border: ${({ theme }) => `3px solid ${theme.main.primaryLighter}`};
  box-shadow: ${({ theme }) =>
    `0 0.063rem 0.17rem 0.033rem ${theme.main.grayLight}`};

  background-color: ${({ theme }) => theme.main.white};

  & > form {
    display: flex;
    flex-direction: column;
    width: 90%;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin: 0 auto;
  font-size: 0.7rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;
export default Membership;
