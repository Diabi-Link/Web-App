import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Formik, Form as FormikForm, FormikProps } from 'formik';
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/icomoon/eye';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';
import { ic_mail as mail } from 'react-icons-kit/md/ic_mail';
import { facebook } from 'react-icons-kit/fa/facebook';
import { googlePlus } from 'react-icons-kit/fa/googlePlus';
import { useMutation } from '@apollo/client';

import { ValidateLoginSchema } from '../Validation';

import Input from '../../../ui/Input';
import Button from '../../../ui/Button';

import { LOGIN, LoginData, LoginResponse } from '../../../api';
import { useAuthToken } from '../../../helpers/localstorage/auth';
import Loader from '../../../ui/Loader';

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

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
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

const Text = styled.p`
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  margin: 1.5rem 0 0.3rem;
  color: ${(props) => props.theme.main.dark};
`;

const IconBox = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  border: 1px solid #dddddd;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  color: ${(props) => props.theme.main.dark};
  transition: transform ease 0.4s;

  &:hover {
    transform: scale(1.05, 1.05);
  }
`;

const Form = (): JSX.Element => {
  const { setAuthToken } = useAuthToken();

  const [login, { loading }] = useMutation<
    LoginResponse,
    { loginData: LoginData }
  >(LOGIN, {
    onCompleted: (payload) => setAuthToken(payload.Login.accessToken),
    onError: () => null,
  });
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
        <IconWrapper>
          <IconBox href="/register/account">
            <Icon icon={facebook} size={20} />
          </IconBox>
          <IconBox href="/register/account">
            <Icon icon={googlePlus} size={20} />
          </IconBox>
        </IconWrapper>
        <Text>Ou utiliser votre email </Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={ValidateLoginSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<{ email: string; password: string }>) => (
            <FormikForm>
              <ContentWrapper>
                <InputWrapper>
                  <InputLabel>Adresse email</InputLabel>
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
                  <InputLabel>Mot de passe</InputLabel>
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
                    <ForgotLink to="/">Mot de passe oublié ?</ForgotLink>
                  </ForgotWrapper>
                </InputWrapper>
              </ContentWrapper>
              <ButtonWrapper>
                <StyledButton
                  type="submit"
                  label={
                    loading ? <Loader loaderStyle="white" /> : 'Se connecter'
                  }
                  btnStyle="primary"
                  shadow
                  disabled={loading}
                />
              </ButtonWrapper>
              <ConnectionWrapper>
                <p>Vous n&apos;avez pas de compte ?</p>
                <ConnectLink to="/register/user">Rejoignez-nous.</ConnectLink>
              </ConnectionWrapper>
            </FormikForm>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Form;
