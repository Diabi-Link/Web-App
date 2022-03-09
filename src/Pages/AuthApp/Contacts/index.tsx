import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Switch, Route, Redirect } from 'react-router-dom';

import Heading from '../../../ui/Heading';

import Menu from './Menu';
import Add from './Add';
import List from './List';

const Contacts = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Container>
      <Wrapper>
        <PageTitle level={1}>{t('Contacts.Title')}</PageTitle>
        <Switch>
          <Route path="/contacts/menu" exact render={() => <Menu />} />
          <Route path="/contacts/add" render={() => <Add />} />
          <Route path="/contacts/list" render={() => <List />} />
          <Redirect to="/contacts" />
        </Switch>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100vw;
  height: 100vh;

  @media (min-width: 1024px) and (orientation: landscape) {
    width: 85vw;
  }
`;

const PageTitle = styled(Heading)`
  position: relative;
  color: ${({ theme }) => theme.main.primaryLight};
  margin-top: 2rem;
  text-align: center;

  &:before,
  &:after {
    content: '';
    height: 10%;
    top: 50%;
    position: absolute;
  }

  &:before {
    background-color: ${({ theme }) => theme.main.whiteBroken};
    left: -1.5em;
    right: -1.5em;
    z-index: -1;
    height: 101%;
  }

  &:after {
    left: 50%;
    transform: translateX(-50%);
    width: 80vw;
    z-index: -2;
    background-color: ${({ theme }) => theme.main.primaryLight};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export default Contacts;
