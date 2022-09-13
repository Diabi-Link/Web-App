import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { ReactComponent as AddSvg } from '../../../../assets/svgs/ContactAdd.svg';
import { ReactComponent as ListSvg } from '../../../../assets/svgs/ContactList.svg';

import { Heading } from '../../../../ui/Heading';
import Button from '../../../../ui/Button';

export type AccountType = 'add' | 'list';

const Menu = (): JSX.Element => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const accountSelector = (type: AccountType): JSX.Element => (
    <AccountSelectorWrapper>
      {type === 'add' && <AddSvg width={120} />}
      {type === 'list' && <ListSvg width={120} />}

      <Heading level={3}>
        {type === 'add' && t('Contacts.Add')}
        {type === 'list' && t('Contacts.List')}
      </Heading>
    </AccountSelectorWrapper>
  );

  return (
    <Container data-testid="auth-contacts-menu-page">
      <ChoiceWrapper>
        <Heading level={2}>{t('Contacts.Choice')}</Heading>
        <AccountSelectorContainer>
          <StyledBox
            label={accountSelector('add')}
            onClick={() => push('/contacts/add')}
            btnStyle="white"
            isSelected={false}
            data-testid="add-box"
          />
          <StyledBox
            label={accountSelector('list')}
            onClick={() => push('/contacts/list')}
            btnStyle="white"
            isSelected={false}
            data-testid="list-box"
          />
        </AccountSelectorContainer>
      </ChoiceWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ChoiceWrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
`;

const AccountSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    margin: 5rem;
    justify-content: space-around;
  }
`;

const AccountSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > svg {
    margin: 1rem;
  }
`;

const StyledBox = styled(Button)<{
  isSelected: boolean;
}>`
  height: 11rem;
  width: 11rem;
  margin: 1rem;
  border: ${({ theme }) => `3px solid ${theme.main.primaryLighter}`};
  box-shadow: ${({ theme }) =>
    `0 0.063rem 0.17rem 0.033rem ${theme.main.grayLight}`};
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.main.white};
    box-shadow: ${({ theme }) =>
      `0 0.063rem 1.2rem 0 ${theme.main.primaryLight}`};
  }

  @media (min-width: 1024px) {
    margin: 2rem;
    height: 13rem;
    width: 13rem;
  }
`;

export default Menu;
