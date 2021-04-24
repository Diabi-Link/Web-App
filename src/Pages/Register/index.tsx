import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import UserInfo from './UserInfo';
import AccountInfo from './AccountInfo';
import { RegisterProvider } from './RegisterContext';
import { StepProgress } from '../../ui';

const Container = styled.div`
  display: flex;
  max-height: 100vh;
  max-width: 100vw;
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30vw;
  height: 100vh;
  background-color: ${(props) => props.theme.main.primaryLighter};
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  height: 100vh;
`;

const FormWrapper = styled.div`
  width: 70%;
`;

const StepNavWrapper = styled.div``;

const Register = (): JSX.Element => {
  return (
    <Container>
      <Left>
        <StepWrapper>
          <StepProgress />
        </StepWrapper>
        <FormWrapper>
          <RegisterProvider>
            <Switch>
              <Route path="/register/user" exact render={() => <UserInfo />} />
              <Route path="/register/account" render={() => <AccountInfo />} />
              <Redirect to="/login" />
            </Switch>
          </RegisterProvider>
        </FormWrapper>
        <StepNavWrapper />
      </Left>
      <Right />
    </Container>
  );
};

export default Register;
