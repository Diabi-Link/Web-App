import React, { useState } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { ReactComponent as ReferentSvg } from '../../../assets/images/Referent.svg';
import { ReactComponent as DiabeticSvg } from '../../../assets/images/Diabetic.svg';
import { ReactComponent as MedicalProfessionalSvg } from '../../../assets/images/MedicalProfessional.svg';

import { AccountType } from '../RegisterContext';
import Button from '../../../ui/Button';
import Heading from '../../../ui/Heading';
import AccountInfoText from '../AccountInfoText';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .childContainer {
    margin-top: 2.188rem;
  }
`;

const ContentWrapper = styled.div`
  width: 90%;
`;

const AccountSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

const AccountSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)<{
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

const Account = (): JSX.Element => {
  const [selectedBtn, setSelectedBtn] = useState<AccountType>('diabetic');
  const [hoveredBtn, setHoveredBtn] = useState<AccountType | undefined>(
    undefined,
  );

  const accountSelector = (type: AccountType): JSX.Element => (
    <AccountSelectorWrapper>
      {type === 'diabetic' && <DiabeticSvg width={115} />}
      {type === 'referent' && <ReferentSvg width={115} />}
      {type === 'medicalProfessional' && <MedicalProfessionalSvg width={115} />}
      <Heading level={3}>
        {type === 'diabetic' && 'Diabétique'}
        {type === 'referent' && 'Référent'}
        {type === 'medicalProfessional' && 'Corps médical'}
      </Heading>
    </AccountSelectorWrapper>
  );

  return (
    <Container>
      <Heading level={1}>Choisissez votre type de compte...</Heading>
      <ContentWrapper>
        <AccountSelectorContainer className="childContainer">
          <StyledButton
            label={accountSelector('diabetic')}
            onMouseEnter={() => setHoveredBtn('diabetic')}
            onMouseLeave={() => setHoveredBtn(undefined)}
            onClick={() => setSelectedBtn('diabetic')}
            btnStyle="white"
            isSelected={selectedBtn === 'diabetic'}
          />
          <StyledButton
            label={accountSelector('referent')}
            onMouseEnter={() => setHoveredBtn('referent')}
            onMouseLeave={() => setHoveredBtn(undefined)}
            onClick={() => setSelectedBtn('referent')}
            btnStyle="white"
            isSelected={selectedBtn === 'referent'}
          />
          <StyledButton
            label={accountSelector('medicalProfessional')}
            onMouseEnter={() => setHoveredBtn('medicalProfessional')}
            onMouseLeave={() => setHoveredBtn(undefined)}
            onClick={() => setSelectedBtn('medicalProfessional')}
            btnStyle="white"
            isSelected={selectedBtn === 'medicalProfessional'}
          />
        </AccountSelectorContainer>
        <AccountInfoText type={hoveredBtn || selectedBtn} />
      </ContentWrapper>
    </Container>
  );
};

export default Account;
