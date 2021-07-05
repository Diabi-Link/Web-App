import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';
import { eye } from 'react-icons-kit/icomoon/eye';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';
import { Formik, Form, FormikProps } from 'formik';
import { useMutation } from '@apollo/client';

import { SIGN_UP, UserData, SignUpResponse } from '../../../../api';

import { RegisterContext } from '../../../../contexts/RegisterContext';
import { ValidatePasswordSchema } from '../Validation';
import Heading from '../../../../ui/Heading';
import Button from '../../../../ui/Button';
import Input from '../../../../ui/Input';

import { DeepNonNullable } from '../../../../types/utilities';
import { RegisterType } from '../../../../types/register';
import Loader from '../../../../ui/Loader';

type Props = {
  onClick: (step: number) => void;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (min-width: 1500px) {
    width: 80%;
  }
`;

const Wrapper = styled(Form)`
  width: 100%;
  flex: 1;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  margin-bottom: 50px;
`;

const PasswordBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
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

const StyledButton = styled(Button)`
  width: 150px;
  height: 40px;
`;

const SecurityInfo = ({ onClick }: Props): JSX.Element => {
  const { t } = useTranslation();
  const {
    state: { user },
  } = useContext(RegisterContext);

  const [signUp, { loading }] = useMutation<
    SignUpResponse,
    { userData: UserData }
  >(SIGN_UP, {
    onCompleted: () => {
      onClick(4);
    },
    onError: () => null, // TODO: Create a middleware to catch and handle API error
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = ({
    password,
  }: {
    password: string;
    confirmPassword: string;
  }) => {
    import('bcryptjs').then((bcrypt) => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      signUp({
        variables: {
          userData: {
            ...(user as DeepNonNullable<RegisterType>),
            password: hash,
          },
        },
      });
    });
  };

  return (
    <Container>
      <Heading level={1}>{t('Register.Security.Title')}</Heading>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={ValidatePasswordSchema}
        onSubmit={handleSubmit}
      >
        {(
          props: FormikProps<{ password: string; confirmPassword: string }>,
        ) => (
          <Wrapper>
            <ContentWrapper>
              <PasswordBox>
                <InputWrapper>
                  <InputLabel>{t('Register.Security.Password')}</InputLabel>
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
                    data-testid="password-input"
                  />
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>
                    {t('Register.Security.ConfirmPassword')}
                  </InputLabel>
                  <Input
                    name="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="•••••••••"
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
            </ContentWrapper>
            <ButtonWrapper>
              <StyledButton
                type="button"
                label={t('Register.Security.BackButton')}
                btnStyle="primary"
                shadow
                iconStart={arrowLeft2}
                onClick={() => onClick(2)}
                disabled={loading}
              />
              <StyledButton
                type="submit"
                label={
                  loading ? (
                    <Loader loaderStyle="white" />
                  ) : (
                    t('Register.Security.NextButton')
                  )
                }
                btnStyle="primary"
                shadow
                disabled={loading}
                data-testid="next-button"
              />
            </ButtonWrapper>
          </Wrapper>
        )}
      </Formik>
    </Container>
  );
};

export default SecurityInfo;
