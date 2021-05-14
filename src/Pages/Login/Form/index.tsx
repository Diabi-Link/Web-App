import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Formik, Form as FormikForm, FormikProps } from 'formik';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { eye } from 'react-icons-kit/icomoon/eye';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';
import { ic_mail as mail } from 'react-icons-kit/md/ic_mail';

import { ValidateLoginSchema } from '../Validation';

import Input from '../../../ui/Input';
import Button from '../../../ui/Button';

const Wrapper = styled(FormikForm)`
  width: 80%;
  @media (min-width: 1500px) {
    width: 70%;
  }
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
  color: ${(props) => props.theme.main.dark};
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
  const [showPassword, setShowPassword] = useState(true);
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={ValidateLoginSchema}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<{ email: string; password: string }>) => (
        <Wrapper>
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
                placeholder="*******"
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
              label="Me connecter"
              btnStyle="primary"
              shadow
              iconEnd={arrowRight2}
            />
          </ButtonWrapper>
          <ConnectionWrapper>
            <p>Vous n&apos;avez pas de compte ?</p>
            <ConnectLink to="/register/user">Rejoignez-nous.</ConnectLink>
          </ConnectionWrapper>
        </Wrapper>
      )}
    </Formik>
  );
};

export default Form;
