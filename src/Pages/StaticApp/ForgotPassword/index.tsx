import React, { useState } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-icons-kit';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';

import FrameSide from './FrameSide';
import SendCode from './SendCode';
import ResetPassword from './ResetPassword';

const Container = styled.div`
  display: flex;
  max-height: 100vh;
  max-width: 100vw;
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

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
  flex: 1;
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

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  padding: 0px 10px;
  color: ${(props) => props.theme.main.primary};
`;

const ForgotPassword = (): JSX.Element => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  return (
    <Container>
      <Left>
        <BackWrapper>
          <BackLink to="/">
            <ArrowBack icon={arrowLeft2} size={20} />
            <Text>{t('Link.BackSite')}</Text>
          </BackLink>
        </BackWrapper>
        <FormWrapper>
          <Switch>
            <Route
              path="/forgot-password/send-code"
              exact
              render={() => <SendCode onClick={(e) => setStep(e)} />}
            />
            <Route
              path="/forgot-password/reset"
              render={() => <ResetPassword />}
            />
            <Redirect to="/login" />
          </Switch>
        </FormWrapper>
      </Left>
      <Right>
        <FrameSide step={step} />
      </Right>
    </Container>
  );
};

export default ForgotPassword;
