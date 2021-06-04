import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { darken } from 'polished';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';

import { useMutation } from '@apollo/client';
import { ReactComponent as ReferentSvg } from '../../../../assets/images/Referent.svg';
import { ReactComponent as PatientSvg } from '../../../../assets/images/Patient.svg';
import { ReactComponent as MedicalProfessionalSvg } from '../../../../assets/images/MedicalProfessional.svg';

import { SIGN_UP, UserData, SignUpResponse } from '../../../../api';
import { DeepNonNullable } from '../../../../types/utilities';
import { RegisterType } from '../../../../types/register';
import Loader from '../../../../ui/Loader';

import {
  RegisterContext,
  RegisterActionTypes,
} from '../../../../contexts/RegisterContext';
import Button from '../../../../ui/Button';
import Heading from '../../../../ui/Heading';
import AccountInfoText from '../AccountInfoText';

import { AccountType } from '../../../../types/user';

type Props = {
  onClick: (step: number) => void;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (min-width: 1500px) {
    width: 80%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  margin-bottom: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const AccountSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin: 2.4rem 0;
`;

const AccountSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledBox = styled(Button)<{
  isSelected: boolean;
}>`
  padding: 1.7rem 0.5rem 0;
  box-shadow: ${({ isSelected, theme }) =>
    isSelected
      ? `0 0.063rem 1.2rem 0 ${darken(0.1, theme.main.primary)}`
      : `0 0.063rem 0.17rem 0.033rem ${theme.main.grayLight}`};
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.main.white};
    box-shadow: ${({ isSelected, theme }) =>
      `0 0.063rem 1.2rem 0 ${
        isSelected ? darken(0.1, theme.main.primary) : theme.main.primaryLight
      }`};
  }
`;

const StyledButton = styled(Button)`
  width: 150px;
  height: 40px;
`;

const Account = ({ onClick }: Props): JSX.Element => {
  const { search } = useLocation();
  const { firstname, lastname, email, birthDate } = parse(search, {
    arrayFormat: 'bracket',
  });
  const {
    state: { user, info },
    dispatch,
  } = useContext(RegisterContext);
  const [selectedAccount, setSelectedAccount] = useState<AccountType>(
    'patient',
  );
  const [hoveredAccount, setHoveredAccount] = useState<AccountType | undefined>(
    undefined,
  );

  const [signUp, { loading }] = useMutation<
    SignUpResponse,
    { userData: UserData }
  >(SIGN_UP, {
    onCompleted: () => {
      onClick(4);
    },
    onError: () => null, // TODO: Create a middleware to catch and handle API error
  });

  const handleSubmit = () => {
    if (firstname) {
      signUp({
        variables: {
          userData: {
            ...(user as DeepNonNullable<RegisterType>),
            password: '123456',
          },
        },
      });
      return;
    }
    dispatch({
      type: RegisterActionTypes.UpdateUser,
      payload: {
        ...user,
        account: selectedAccount,
      },
    });
    onClick(3);
  };

  useEffect(() => {
    if (firstname && lastname && email) {
      dispatch({
        type: RegisterActionTypes.UpdateInfo,
        payload: {
          ...info,
          step: 2,
        },
      });
      dispatch({
        type: RegisterActionTypes.UpdateUser,
        payload: {
          ...user,
          firstName: firstname.toString(),
          lastName: lastname.toString(),
          email: email.toString(),
          birthDate:
            !birthDate || birthDate === 'null'
              ? new Date('06/09/2000')
              : new Date(birthDate.toString()),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const accountSelector = (type: AccountType): JSX.Element => (
    <AccountSelectorWrapper>
      {type === 'patient' && <PatientSvg width={115} />}
      {type === 'referent' && <ReferentSvg width={115} />}
      {type === 'medicalProfessional' && <MedicalProfessionalSvg width={115} />}
      <Heading level={3}>
        {type === 'patient' && 'Patient'}
        {type === 'referent' && 'Référent'}
        {type === 'medicalProfessional' && 'Corps médical'}
      </Heading>
    </AccountSelectorWrapper>
  );

  return (
    <Container>
      <Heading level={1}>Choisissez votre type de compte...</Heading>
      <Wrapper>
        <ContentWrapper>
          <AccountSelectorContainer>
            <StyledBox
              label={accountSelector('patient')}
              onMouseEnter={() => setHoveredAccount('patient')}
              onMouseLeave={() => setHoveredAccount(undefined)}
              onClick={() => setSelectedAccount('patient')}
              btnStyle="white"
              isSelected={selectedAccount === 'patient'}
              data-testid="patient-box"
            />
            <StyledBox
              label={accountSelector('referent')}
              onMouseEnter={() => setHoveredAccount('referent')}
              onMouseLeave={() => setHoveredAccount(undefined)}
              onClick={() => setSelectedAccount('referent')}
              btnStyle="white"
              isSelected={selectedAccount === 'referent'}
              data-testid="referent-box"
            />
            <StyledBox
              label={accountSelector('medicalProfessional')}
              onMouseEnter={() => setHoveredAccount('medicalProfessional')}
              onMouseLeave={() => setHoveredAccount(undefined)}
              onClick={() => setSelectedAccount('medicalProfessional')}
              btnStyle="white"
              isSelected={selectedAccount === 'medicalProfessional'}
              data-testid="medicalProfessional-box"
            />
          </AccountSelectorContainer>
          <AccountInfoText type={hoveredAccount || selectedAccount} />
        </ContentWrapper>
        <ButtonWrapper>
          <StyledButton
            type="button"
            label="Retour"
            btnStyle="primary"
            shadow
            iconStart={arrowLeft2}
            onClick={() => onClick(1)}
          />
          <StyledButton
            type="submit"
            label={loading ? <Loader loaderStyle="white" /> : 'Suivant'}
            btnStyle="primary"
            shadow
            iconEnd={arrowRight2}
            onClick={handleSubmit}
            disabled={loading}
            data-testid="next-button"
          />
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
};

export default Account;
