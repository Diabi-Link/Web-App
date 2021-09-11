import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form as FormikForm, FormikProps } from 'formik';
import { eye } from 'react-icons-kit/icomoon/eye';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';
import { ic_mail as mail } from 'react-icons-kit/md/ic_mail';
import { useLazyQuery, useMutation } from '@apollo/client';

import jwtDecode from 'jwt-decode';
import { ValidateLoginSchema } from '../Validation';

import Input from '../../../../ui/Input';
import Button from '../../../../ui/Button';

import {
  FetchUserResponse,
  FETCH_USER,
  LOGIN,
  LoginData,
  LoginResponse,
} from '../../../../api';
import { useAuthToken } from '../../../../hooks/useAuthToken';
import Loader from '../../../../ui/Loader';
import { UserActionTypes, UserContext } from '../../../../contexts/UserContext';

const Container = styled.div`
  width: 80%;

  @media (min-width: 1500px) {
    width: 70%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 60%;
  margin-bottom: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ConnectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0px 20px;
  font-size: 16px;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 15px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin: 15px 5px;
`;

const ForgotWrapper = styled.div`
  display: flex;
  font-size: 13px;
  font-weight: 500;
`;

const ForgotLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  padding: 10px 10px;
  text-decoration: none;
  color: ${(props) => props.theme.main.primary};
`;

const ConnectLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  padding: 0px 10px;
  color: ${(props) => props.theme.main.primary};
`;

const StyledButton = styled(Button)`
  width: 200px;
  height: 40px;
`;

const Form = (): JSX.Element => {
  const { t } = useTranslation();
  const { dispatch } = useContext(UserContext);
  const { authToken, setAuthToken, removeAuthToken } = useAuthToken();

  const [fetchUser, { loading: awaitingFetch }] = useLazyQuery<
    FetchUserResponse,
    { id: number }
  >(FETCH_USER, {
    onCompleted: (payload) => {
      dispatch({
        type: UserActionTypes.FetchUser,
        payload: { ...payload.User },
      });
    },
    onError: () => removeAuthToken(),
  });

  const [login, { loading: awaitingLogin }] = useMutation<
    LoginResponse,
    { loginData: LoginData }
  >(LOGIN, {
    onCompleted: (payload) => setAuthToken(payload.Login.accessToken),
    onError: () => null,
  });

  useEffect(() => {
    if (authToken) {
      const decrypted: { userId: number } = jwtDecode(authToken);
      fetchUser({ variables: { id: decrypted.userId } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    login({ variables: { loginData: { email, password } } });
  };

  return (
    <Container>
      <Wrapper>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={ValidateLoginSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<{ email: string; password: string }>) => (
            <FormikForm>
              <ContentWrapper>
                <InputWrapper>
                  <InputLabel>{t('Login.MailAddress')}</InputLabel>
                  <Input
                    name="email"
                    type="text"
                    placeholder="John.cena@gmail.com"
                    value={props.values.email}
                    onChange={(e) => {
                      props.handleChange(e);
                    }}
                    errorText={
                      props.errors.email && props.touched.email
                        ? props.errors.email
                        : undefined
                    }
                    icon={mail}
                  />
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>{t('Login.Password')}</InputLabel>
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="•••••••••"
                    value={props.values.password}
                    onChange={(e) => {
                      props.handleChange(e);
                    }}
                    errorText={
                      props.errors.password && props.touched.password
                        ? props.errors.password
                        : undefined
                    }
                    icon={showPassword ? eye : eyeBlocked}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <ForgotWrapper>
                    <ForgotLink to="/forgot-password/send-code">
                      {t('Login.ForgotPassword')}
                    </ForgotLink>
                  </ForgotWrapper>
                </InputWrapper>
              </ContentWrapper>
              <ButtonWrapper>
                <StyledButton
                  type="submit"
                  label={
                    awaitingLogin || awaitingFetch ? (
                      <Loader loaderStyle="white" />
                    ) : (
                      t('Login.Button')
                    )
                  }
                  btnStyle="primary"
                  shadow
                  disabled={awaitingLogin || awaitingFetch}
                />
              </ButtonWrapper>
              <ConnectionWrapper>
                <p>{t('Login.AccountNone')}</p>
                <ConnectLink to="/register/user">
                  {t('Login.RegisterLink')}
                </ConnectLink>
              </ConnectionWrapper>
            </FormikForm>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Form;