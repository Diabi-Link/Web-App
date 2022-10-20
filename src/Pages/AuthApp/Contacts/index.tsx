import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PageTitle } from '../../../ui/Heading';

import Menu from './Menu';
import Add from './Add';
import List from './List';
// import Manage from './Manage';

const Contacts = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Container>
      <Wrapper>
        <PageTitle level={1}>{t('Contacts.Title')}</PageTitle>
        <Switch>
          <Route path="/contacts/menu" exact render={() => <Menu />} />
          <Route path="/contacts/add" render={() => <Add />} />
          {/* <Route path="/contacts/manage" render={() => <Manage />} /> */}
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

export default Contacts;
