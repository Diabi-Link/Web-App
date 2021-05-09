import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { eye } from 'react-icons-kit/icomoon/eye';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';
import { Formik, Form, FormikProps } from 'formik';

import { RegisterContext, RegisterActionTypes } from '../RegisterContext';
import { ValidatePasswordSchema } from '../Validation';

import Heading from '../../../ui/Heading';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';

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
  min-height: 60%;
  margin: 20px 0px;
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

const SecretInfo = ({ onClick }: Props): JSX.Element => {
  const { state, dispatch } = useContext(RegisterContext);
  const { user } = state;
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);

  const handleSubmit = (values: {
    password: string;
    confirmPassword: string;
  }) => {
    dispatch({
      type: RegisterActionTypes.UpdateUser,
      payload: {
        ...state.user,
        password: values.password,
      },
    });
  };

  return (
    <Container>
      <Heading level={1}>Finalisons votre compte !</Heading>
      <Formik
        initialValues={{ password: user.password, confirmPassword: '' }}
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
            </ContentWrapper>
            <ButtonWrapper>
              <StyledButton
                type="button"
                label="Retour"
                btnStyle="primary"
                shadow
                onClick={() => onClick(2)}
              />
              <StyledButton
                type="submit"
                label="Suivant"
                btnStyle="primary"
                shadow
                icon={arrowRight2}
              />
            </ButtonWrapper>
          </Wrapper>
        )}
      </Formik>
    </Container>
  );
};

export default SecretInfo;
