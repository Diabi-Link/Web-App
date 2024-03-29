import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form as FormikForm, FormikProps } from 'formik';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { eye } from 'react-icons-kit/icomoon/eye';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';
import { lock } from 'react-icons-kit/fa/lock';

import { ValidateResetSchema } from '../Validation';
import { usePasswordRecoveryLinkMutation } from '../../../../api';

import { Heading } from '../../../../ui/Heading';
import Input from '../../../../ui/Input';
import Button from '../../../../ui/Button';
import Loader from '../../../../ui/Loader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 1rem 0;

  @media (min-width: 1500px) {
    width: 80%;
    margin: 2rem 0;
  }
`;

const Description = styled.div`
  text-align: center;
  font-size: 17px;
  font-weight: 400;
  margin: 1rem 0;

  @media (min-width: 1500px) {
    font-size: 18px;
  }
`;

const FormWrapper = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;

  @media (min-width: 1500px) {
    width: 90%;
  }
`;

const PasswordBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 4rem;

  @media (min-width: 1500px) {
    margin-bottom: 5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 20px;

  @media (min-width: 1500px) {
    margin-top: 30px;
  }
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin: 15px 5px;
`;

const StyledButton = styled(Button)`
  width: 200px;
  height: 40px;
`;

const ResetPassword = (): JSX.Element => {
  const { push } = useHistory();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);

  const [passwordRecoveryLink, { loading }] = usePasswordRecoveryLinkMutation({
    onCompleted: () => {
      push('/login');
    },
    onError: () => null,
  });
  const handleSubmit = ({
    password: newPassword,
    code: secretId,
  }: {
    password: string;
    code: string;
  }) => {
    passwordRecoveryLink({ variables: { newPassword, secretId } });
  };

  return (
    <Container>
      <Heading level={1}>{t('ResetPassword.Title')}</Heading>
      <Description>{t('ResetPassword.Description')}</Description>
      <Formik
        initialValues={{ code: '', password: '', confirmPassword: '' }}
        validationSchema={ValidateResetSchema}
        onSubmit={handleSubmit}
      >
        {(
          props: FormikProps<{
            code: string;
            password: string;
            confirmPassword: string;
          }>,
        ) => (
          <FormWrapper>
            <PasswordBox>
              <InputWrapper>
                <InputLabel>{t('ResetPassword.Code')}</InputLabel>
                <Input
                  name="code"
                  type="text"
                  placeholder="1234"
                  value={props.values.code}
                  onChange={(e) => {
                    props.handleChange(e);
                  }}
                  errorText={
                    props.errors.code && props.touched.code
                      ? props.errors.code
                      : undefined
                  }
                  icon={lock}
                  data-testid="code-input"
                />
              </InputWrapper>
              <InputWrapper>
                <InputLabel>{t('ResetPassword.Password')}</InputLabel>
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
                  data-testid="password-input"
                />
              </InputWrapper>
              <InputWrapper>
                <InputLabel>{t('ResetPassword.ConfirmPassword')}</InputLabel>
                <Input
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="*******"
                  value={props.values.confirmPassword}
                  onChange={(e) => {
                    props.handleChange(e);
                  }}
                  errorText={
                    props.errors.confirmPassword &&
                    props.touched.confirmPassword
                      ? props.errors.confirmPassword
                      : undefined
                  }
                  icon={showConfirm ? eye : eyeBlocked}
                  onClick={() => setShowConfirm(!showConfirm)}
                  data-testid="confirmPassword-input"
                />
              </InputWrapper>
            </PasswordBox>
            <ButtonWrapper>
              {/* <StyledButton
                type="button"
                label="Renvoyer le code"
                btnStyle="primary"
                shadow
                outlined
                iconEnd={loop2}
              /> */}
              <StyledButton
                type="submit"
                label={
                  loading ? (
                    <Loader loaderStyle="white" />
                  ) : (
                    t('ResetPassword.ConfirmButton')
                  )
                }
                btnStyle="primary"
                shadow
                iconEnd={arrowRight2}
                data-testid="reset-button"
              />
            </ButtonWrapper>
          </FormWrapper>
        )}
      </Formik>
    </Container>
  );
};

export default ResetPassword;
