import React, { useContext } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect, Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-icons-kit';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';

import {
  RegisterContext,
  RegisterActionTypes,
} from '../../../contexts/RegisterContext';
import UserInfo from './UserInfo';
import AccountInfo from './AccountInfo';
import SecurityInfo from './SecurityInfo';
import Confirm from './Confirm';
import StepProgress from '../../../ui/StepProgress';
import FrameSide from './FrameSide';

const Container = styled.div`
  display: flex;
  max-height: 100vh;
  max-width: 100vw;
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (min-width: 1500px) {
    margin: 3rem;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30vw;
  height: 100vh;
  background-color: ${(props) => props.theme.main.primaryLighter};

  & > svg {
    margin: 30px 0px;
  }
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
  padding: 30px 100px;
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
  display: flex;
  justify-content: center;
  width: 70%;
  flex: 1;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  padding: 0px 10px;
  color: ${(props) => props.theme.main.primary};
`;

const StepNavWrapper = styled.div``;

const Register = (): JSX.Element => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const { state, dispatch } = useContext(RegisterContext);

  const { info } = state;

  const locations: {
    path: string;
    description: string;
  }[] = [
    { path: '/register/user', description: t('Register.Step.User') },
    { path: '/register/account', description: t('Register.Step.Account') },
    { path: '/register/password', description: t('Register.Step.Confirm') },
    { path: '/register/confirm', description: '' },
  ];

  const handleNav = (step: number) => {
    push(locations[step - 1].path);
    dispatch({
      type: RegisterActionTypes.UpdateInfo,
      payload: {
        ...state.info,
        step,
      },
    });
  };

  return (
    <Container>
      <Left>
        <BackWrapper>
          <BackLink to="/">
            <ArrowBack icon={arrowLeft2} size={20} />
            <Text>{t('Link.BackSite')}</Text>
          </BackLink>
        </BackWrapper>
        <StepWrapper>
          <StepProgress
            step={info.step}
            locations={locations}
            onClick={(step) => handleNav(step)}
          />
        </StepWrapper>
        <FormWrapper>
          <Switch>
            <Route
              path="/register/user"
              exact
              render={() => <UserInfo onClick={(step) => handleNav(step)} />}
            />
            <Route
              path="/register/account"
              render={() => <AccountInfo onClick={(step) => handleNav(step)} />}
            />
            <Route
              path="/register/password"
              render={() => (
                <SecurityInfo onClick={(step) => handleNav(step)} />
              )}
            />
            <Route path="/register/confirm" render={() => <Confirm />} />
            <Redirect to="/login" />
          </Switch>
        </FormWrapper>
        <StepNavWrapper />
      </Left>
      <Right>
        <FrameSide step={info.step} />
      </Right>
    </Container>
  );
};

export default Register;
