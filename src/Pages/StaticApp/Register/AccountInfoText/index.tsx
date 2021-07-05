import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { AccountType } from '../../../../types/user';

type Props = {
  type: AccountType;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 60ch;
`;

const Text = styled.p`
  animation: fadein 0.8s ease-in-out;
  margin: 0 0 0.8rem;
  line-height: 1.6;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ImportantWord = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.main.primary};
`;

const AccountInfoText = ({ type }: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Container>
      {type === 'patient' && (
        <>
          <Text>
            {t('Register.Account.Intro')}
            <ImportantWord>{t('Register.Account.Patient')}</ImportantWord>
            {t('Register.Account.PatientDesc')}
          </Text>
          <Text>
            {t('Register.Account.AccountFree')}
            <ImportantWord>{t('Register.Account.PatientPrice')}</ImportantWord>.
          </Text>
        </>
      )}
      {type === 'referent' && (
        <>
          <Text>
            {t('Register.Account.Intro')}
            <ImportantWord>{t('Register.Account.Referent')}</ImportantWord>
            {t('Register.Account.ReferentDesc')}
          </Text>
          <Text>
            {t('Register.Account.AccountPremium')}
            <ImportantWord>{t('Register.Account.ReferentPrice')}</ImportantWord>
            .
          </Text>
        </>
      )}
      {type === 'medicalProfessional' && (
        <>
          <Text>
            {t('Register.Account.Intro')}
            <ImportantWord>{t('Register.Account.MedicalPro')}</ImportantWord>
            {t('Register.Account.MedicalProDesc')}
          </Text>
          <Text>
            {t('Register.Account.AccountPremium')}
            <ImportantWord>
              {t('Register.Account.MedicalProPrice')}
            </ImportantWord>
            .
          </Text>
        </>
      )}
    </Container>
  );
};

export default AccountInfoText;
