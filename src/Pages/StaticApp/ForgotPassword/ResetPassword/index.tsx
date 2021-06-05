import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form as FormikForm, FormikProps } from 'formik';
import { useHistory } from 'react-router-dom';
// import { loop2 } from 'react-icons-kit/icomoon/loop2';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { eye } from 'react-icons-kit/icomoon/eye';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';
import { lock } from 'react-icons-kit/fa/lock';
import { useMutation } from '@apollo/client';

import { ValidateResetSchema } from '../Validation';
import {
  PASSWORD_RECOVERY_LINK,
  PasswordRecoveryLinkResponse,
} from '../../../../api';

import Heading from '../../../../ui/Heading';
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
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);

  const [passwordRecoveryLink, { loading }] = useMutation<
    PasswordRecoveryLinkResponse,
    { newPassword: string; secretId: string }
  >(PASSWORD_RECOVERY_LINK, {
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
    import('bcryptjs').then((bcrypt) => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newPassword, salt);

      passwordRecoveryLink({ variables: { newPassword: hash, secretId } });
    });
  };

  return (
    <Container>
      <Heading level={1}>Réinitialisez votre mot de passe</Heading>
      <Description>
        Entrez le code reçu sur votre boîte mail afin de modifier votre mot de
        passe actuel
      </Description>
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
                <InputLabel>Code</InputLabel>
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
              </InputWrapper>
              <InputWrapper>
                <InputLabel>Confirmez votre mot de passe</InputLabel>
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
                  loading ? <Loader loaderStyle="white" /> : 'Réinitialiser'
                }
                btnStyle="primary"
                shadow
                iconEnd={arrowRight2}
              />
            </ButtonWrapper>
          </FormWrapper>
        )}
      </Formik>
    </Container>
  );
};

export default ResetPassword;
