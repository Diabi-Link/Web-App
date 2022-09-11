import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form, FormikProps } from 'formik';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { user as iconUser } from 'react-icons-kit/fa/user';
import { ic_mail as mail } from 'react-icons-kit/md/ic_mail';

import {
  RegisterContext,
  RegisterActionTypes,
} from '../../../../contexts/RegisterContext';
import { ValidateUserSchema } from '../Validation';

import Heading from '../../../../ui/Heading';
import Input from '../../../../ui/Input';
import Button from '../../../../ui/Button';
import DateInput from '../../../../ui/DateInput';

import { RegisterType } from '../../../../types/register';

type Props = {
  onClick: (step: number) => void;
};

const User = ({ onClick }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(RegisterContext);

  const { user } = state;

  const handleSubmit = (values: Omit<RegisterType, 'account'>) => {
    dispatch({
      type: RegisterActionTypes.UpdateUser,
      payload: {
        ...state.user,
        ...values,
      },
    });
    onClick(2);
  };

  return (
    <Container>
      <Heading level={1}>{t('Register.User.Title')}</Heading>
      <Formik
        initialValues={user}
        validationSchema={ValidateUserSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<RegisterType>) => (
          <Wrapper>
            <ContentWrapper>
              <InfoBox>
                <InputWrapper>
                  <InputLabel>{t('Register.User.FirstName')}</InputLabel>
                  <Input
                    name="firstName"
                    type="text"
                    data-testid="firstName-input"
                    placeholder="John"
                    value={props.values.firstName}
                    onChange={(e) => {
                      props.handleChange(e);
                    }}
                    errorText={
                      props.errors.firstName && props.touched.firstName
                        ? props.errors.firstName
                        : undefined
                    }
                    icon={iconUser}
                  />
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>{t('Register.User.LastName')}</InputLabel>
                  <Input
                    name="lastName"
                    type="text"
                    data-testid="lastName-input"
                    placeholder="Cena"
                    value={props.values.lastName}
                    onChange={(e) => {
                      props.handleChange(e);
                    }}
                    errorText={
                      props.errors.lastName && props.touched.lastName
                        ? props.errors.lastName
                        : undefined
                    }
                    icon={iconUser}
                  />
                </InputWrapper>
              </InfoBox>
              <InfoBox>
                <InputWrapper>
                  <InputLabel>{t('Register.User.MailAddress')}</InputLabel>
                  <Input
                    name="email"
                    type="text"
                    data-testid="email-input"
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
                  <InputLabel>{t('Register.User.BirthDate')}</InputLabel>
                  <DateInput
                    value={props.values.birthDate}
                    errorText={
                      props.errors.birthDate && props.touched.birthDate
                        ? props.errors.birthDate
                        : undefined
                    }
                    onChange={(date) => {
                      props.setFieldValue('birthDate', date);
                    }}
                    icon={calendar}
                  />
                </InputWrapper>
              </InfoBox>
              <ConnectionWrapper>
                <Text>{t('Register.User.AccountExist')}</Text>
                <ConnectLink to="/login">
                  {t('Register.User.LoginLink')}
                </ConnectLink>
              </ConnectionWrapper>
            </ContentWrapper>
            <ButtonWrapper>
              <NextButton
                type="submit"
                label={t('Register.User.Button')}
                data-testid="next-button"
                btnStyle="primary"
                shadow
                iconEnd={arrowRight2}
              />
            </ButtonWrapper>
          </Wrapper>
        )}
      </Formik>
    </Container>
  );
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

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0px;

  @media (min-width: 1500px) {
    margin: 30px 0px 20px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const ConnectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0px 20px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin: 15px 5px;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const ConnectLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  padding: 0px 10px;
  color: ${(props) => props.theme.main.primary};
`;

const NextButton = styled(Button)`
  width: 150px;
  height: 40px;
`;

export default User;
