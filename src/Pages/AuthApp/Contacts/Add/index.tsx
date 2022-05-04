import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Formik, Form as FormikForm, FormikProps } from 'formik';
import { Link } from 'react-router-dom';

import { Icon } from 'react-icons-kit';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { ic_mail as mail } from 'react-icons-kit/md/ic_mail';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';

import { ValidateContactSchema } from './Validation';
import { UserContext } from '../../../../contexts/UserContext';
import {
  ContextActionTypes,
  MainContext,
} from '../../../../contexts/MainContext';
import { useAddContact } from '../../../../api';

import Input from '../../../../ui/Input';
import Heading from '../../../../ui/Heading';
import Button from '../../../../ui/Button';
import Loader from '../../../../ui/Loader';

const Add = (): JSX.Element => {
  const {
    state: { user },
  } = useContext(UserContext);
  const { dispatch: altDispatch } = useContext(MainContext);
  const { t } = useTranslation();

  const [addContact, { loading }] = useAddContact({
    onCompleted: () => {
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: 'Vous avez ajouter un utilisateur avec succès',
          noticeStyle: 'success',
          persistent: false,
          closeable: true,
          duration: 5000,
        },
      });
    },
  });

  const handleSubmit = (
    { email }: { email: string },
    { resetForm }: { resetForm: () => void },
  ) => {
    addContact({
      variables: {
        email,
      },
    });
    resetForm();
  };

  return (
    <Container data-testid="auth-contacts-add-page">
      <BoxWrapper>
        <StyledBox>
          <PageTitle level={2}>{t('Contacts.Add')}</PageTitle>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={ValidateContactSchema}
            onSubmit={handleSubmit}
          >
            {(
              props: FormikProps<{
                email: string;
              }>,
            ) => (
              <FormikForm>
                <InputWrapper>
                  <InputLabel>{t('Login.MailAddress')}</InputLabel>
                  <Input
                    name="email"
                    type="text"
                    data-testid="email-input"
                    placeholder={user?.email}
                    value={props?.values.email}
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
                <ButtonWrapper>
                  <AddButton
                    type="submit"
                    label={
                      loading ? (
                        <Loader loaderStyle="white" />
                      ) : (
                        t('Contacts.Validate')
                      )
                    }
                    btnStyle="primary"
                    data-testid="save-button"
                    shadow
                    iconEnd={arrowRight2}
                    disabled={loading}
                  />
                </ButtonWrapper>
              </FormikForm>
            )}
          </Formik>
        </StyledBox>
      </BoxWrapper>
      <BackWrapper>
        <BackLink to="/contacts/menu" data-testid="back-arrow">
          <ArrowBack icon={arrowLeft2} size={20} />
          <Text>{t('Link.Back')}</Text>
        </BackLink>
      </BackWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const BoxWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  justify-content: center;
  align-items: center;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 45vh;
  width: 90vw;
  border-radius: 10px;
  border: ${({ theme }) => `3px solid ${theme.main.primaryLighter}`};
  box-shadow: ${({ theme }) =>
    `0 0.063rem 0.17rem 0.033rem ${theme.main.grayLight}`};

  background-color: ${({ theme }) => theme.main.white};

  & > form {
    display: flex;
    flex-direction: column;
    width: 90%;
  }

  @media (min-width: 768px) {
    height: 20rem;
    width: 30rem;
  }
`;

const PageTitle = styled(Heading)`
  position: relative;
  display: inline-block;
  &:after {
    content: '';
    height: 3px;
    position: absolute;
    bottom: -10px;
    width: 50%;
    z-index: 90;
    left: calc(28%);
    background-color: ${({ theme }) => theme.main.primaryLight};
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 3rem 0px;

  @media (min-width: 768px) {
    margin: 1.5rem 0px;
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
`;

const AddButton = styled(Button)`
  margin-top: 2rem;
`;

const BackWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
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

export default Add;
