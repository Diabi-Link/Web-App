import React, { useContext } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';

import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';
import UserInfo from './UserInfo';
import AccountInfo from './AccountInfo';
import SecretInfo from './SecretInfo';
import { RegisterContext } from './RegisterContext';
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

const BackWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 50px 100px;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const ArrowBack = styled(Icon)`
  color: ${({ theme }) => theme.main.primary};
`;

const FormWrapper = styled.div`
  width: 70%;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  padding: 0px 10px;
  color: ${(props) => props.theme.main.primary};
`;

const StepNavWrapper = styled.div``;

const Register = (): JSX.Element => {
  const { state } = useContext(RegisterContext);

  const { info } = state;

  const locations: {
    path: string;
    description: string;
  }[] = [
    { path: '/register/user', description: 'Utilisateur' },
    { path: '/register/account', description: 'Type de compte' },
    { path: '/register/password', description: 'On y est presque !' },
  ];

  return (
    <Container>
      <Left>
        <BackWrapper>
          <BackLink to="/">
            <ArrowBack icon={arrowLeft2} size={20} />
            <Text>Revenir au site</Text>
          </BackLink>
        </BackWrapper>
        <StepWrapper>
          <StepProgress step={info.step} locations={locations} />
        </StepWrapper>
        <FormWrapper>
          <Switch>
            <Route path="/register/user" exact render={() => <UserInfo />} />
            <Route path="/register/account" render={() => <AccountInfo />} />
            <Route path="/register/password" render={() => <SecretInfo />} />
            <Redirect to="/login" />
          </Switch>
        </FormWrapper>
        <StepNavWrapper />
      </Left>
      <Right />
    </Container>
  );
};

export default Register;
