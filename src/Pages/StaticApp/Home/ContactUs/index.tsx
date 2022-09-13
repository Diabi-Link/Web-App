import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Formik, Form as FormikForm, FormikProps } from 'formik';

import { Icon } from 'react-icons-kit';
import { ic_mail as mail } from 'react-icons-kit/md/ic_mail';
import { location } from 'react-icons-kit/entypo/location';
import {
  ContextActionTypes,
  MainContext,
} from '../../../../contexts/MainContext';
import { useContactUs } from '../../../../api';

import { Heading } from '../../../../ui/Heading';
import Input from '../../../../ui/Input';
import TextArea from '../../../../ui/TextArea';
import Button from '../../../../ui/Button';
import Loader from '../../../../ui/Loader';

import { ValidateContactSchema } from './Validation';
import { capitalize } from '../../../../utils';

type Props = {
  email: string;
  firstName: string;
  lastName: string;
  topic: string;
  message: string;
};

const ContactUs = () => {
  const { t } = useTranslation();
  const { dispatch: altDispatch } = useContext(MainContext);

  const [contactUs, { loading }] = useContactUs({
    onCompleted: () => {
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: t('ContactUs.Success'),
          noticeStyle: 'success',
          persistent: false,
          closeable: true,
          duration: 5000,
        },
      });
    },
    onError: () => {
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: t('ContactUs.Error'),
          noticeStyle: 'error',
          persistent: false,
          closeable: true,
          duration: 5000,
        },
      });
    },
  });

  const handleSubmit = async (
    { email, firstName, lastName, topic, message }: Props,
    { resetForm }: { resetForm: () => void },
  ) => {
    contactUs({
      variables: {
        email,
        topic,
        message,
        firstName,
        lastName,
      },
    });
    resetForm();
  };

  return (
    <ContactUsContainer id="contact">
      <ContactUsWrapper>
        <Title level={1}>{t('ContactUs.Title')}</Title>
        <LocationWrapper>
          <LocationBox>
            <StyledIcon icon={mail} size={25} />
            <Content level={2}>Diabilinkmrs@gmail.com</Content>
          </LocationBox>
          <LocationBox>
            <StyledIcon icon={location} size={25} />
            <Content level={2}>Marseille</Content>
          </LocationBox>
        </LocationWrapper>
        <FormWrapper>
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              topic: '',
              message: '',
            }}
            validationSchema={ValidateContactSchema}
            onSubmit={handleSubmit}
          >
            {(props: FormikProps<Props>) => (
              <FormikForm>
                <FormBox>
                  <InputWrapper>
                    <InputLabel>{t('Register.User.FirstName')}</InputLabel>
                    <Input
                      name="firstName"
                      type="text"
                      data-testid="firstName-input"
                      placeholder="Marc"
                      value={capitalize(props.values.firstName)}
                      onChange={(e) => {
                        props.handleChange(e);
                      }}
                      errorText={
                        props.errors.firstName && props.touched.firstName
                          ? props.errors.firstName
                          : undefined
                      }
                    />
                  </InputWrapper>
                  <InputWrapper>
                    <InputLabel>{t('Register.User.LastName')}</InputLabel>
                    <Input
                      name="lastName"
                      type="text"
                      data-testid="lastName-input"
                      placeholder="Dubois"
                      value={capitalize(props.values.lastName)}
                      onChange={(e) => {
                        props.handleChange(e);
                      }}
                      errorText={
                        props.errors.lastName && props.touched.lastName
                          ? props.errors.lastName
                          : undefined
                      }
                    />
                  </InputWrapper>
                </FormBox>
                <InputWrapper>
                  <InputLabel>{t('Login.MailAddress')}</InputLabel>
                  <Input
                    name="email"
                    type="text"
                    data-testid="email-input"
                    placeholder="Marc.dubois@gmail.com"
                    value={props?.values.email}
                    onChange={(e) => {
                      props.handleChange(e);
                    }}
                    errorText={
                      props.errors.email && props.touched.email
                        ? props.errors.email
                        : undefined
                    }
                  />
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>{t('ContactUs.Topic')}</InputLabel>
                  <Input
                    name="topic"
                    type="text"
                    data-testid="topic-input"
                    placeholder={t('ContactUs.Topic')}
                    value={props?.values.topic}
                    onChange={(e) => {
                      props.handleChange(e);
                    }}
                    errorText={
                      props.errors.topic && props.touched.topic
                        ? props.errors.topic
                        : undefined
                    }
                  />
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>{t('ContactUs.Message')}</InputLabel>
                  <TextArea
                    name="message"
                    rows={8}
                    data-testid="message-input"
                    placeholder={t('ContactUs.Message')}
                    value={props?.values.message}
                    onChange={(e) => {
                      props.handleChange(e);
                    }}
                    errorText={
                      props.errors.message && props.touched.message
                        ? props.errors.message
                        : undefined
                    }
                  />
                </InputWrapper>
                <ButtonWrapper>
                  <Button
                    type="submit"
                    btnStyle="white"
                    label={
                      loading ? (
                        <Loader loaderStyle="white" />
                      ) : (
                        t('ContactUs.Send')
                      )
                    }
                    data-testid="send-button"
                    shadow
                    disabled={loading}
                  />
                </ButtonWrapper>
              </FormikForm>
            )}
          </Formik>
        </FormWrapper>
      </ContactUsWrapper>
    </ContactUsContainer>
  );
};

const ContactUsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 3rem;

  @media (orientation: portrait) and (max-width: 600px) {
    padding: 2rem;
  }
`;

const ContactUsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: white;
  width: 80vw;
`;

const LocationWrapper = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  width: 50%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const LocationBox = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.main.primary};
  background-color: white;
  height: 3rem;
  width: 3.5rem;
  border-radius: 10px;
  margin: 1rem 0;

  & > svg {
    margin: 0.7rem;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  width: 50%;

  & > form {
    width: 100%;
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const FormBox = styled.div`
  display: flex;

  justify-content: space-between;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0.5rem 0;
  text-align: left;
  &:first-child {
    margin-right: 30px;
  }
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin: 15px 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 1rem 0;
`;

const Title = styled(Heading)`
  position: relative;
  width: 100%;

  &:before {
    content: '';
    height: 2.5px;
    width: 8rem;
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
  }
  font-size: 2.2rem;
  margin-bottom: 4rem;
`;

const Content = styled(Heading)`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 1rem;
`;

export default ContactUs;
