import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form as FormikForm, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { save } from 'react-icons-kit/fa/save';
import { ValidateProfileSchema } from './Validation';

import { ReactComponent as ProfilePatient } from '../../../assets/svgs/ProfilePatient.svg';
import { ReactComponent as ProfileMP } from '../../../assets/svgs/ProfileMP.svg';
import { ReactComponent as ProfileReferent } from '../../../assets/svgs/ProfileReferent.svg';

import { UserContext } from '../../../contexts/UserContext';

import UserInfo from './UserInfo';
import SecurityInfo from './SecurityInfo';
import Button from '../../../ui/Button';

const Container = styled.div`
  height: 100vh;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (min-width: 1500px) {
    width: 80%;
  }
`;

const SectionTitle = styled.label`
  display: flex;
  font-size: 30px;
  font-weight: 800;
  color: ${(props) => props.theme.main.primary};
  margin: 15px;
`;

const Line = styled.div`
  margin: auto 0;
  border: 2px solid ${(props) => props.theme.main.primary};
  background-color: ${(props) => props.theme.main.primary};
  flex: 1;
  height: 1px;
`;

const AccountWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (min-width: 1500px) {
    width: 80%;
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.main.primaryLight};
  width: 170px;
  height: 170px;
  border-radius: 50%;
  margin: 30px 0px;
`;

const UserDesc = styled.label`
  font-size: 30px;
  font-weight: 700;
  color: ${(props) => props.theme.main.primary};
  margin: auto 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const FieldWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const InfoWrapper = styled.div`
  display: flex;
  width: 100%;

  & > form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  @media (min-width: 1500px) {
    width: 80%;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  margin-right: 5vw;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const SaveButton = styled(Button)`
  margin-top: 2rem;
`;

const Profile = (): React.ReactElement => {
  const { t } = useTranslation();
  const {
    state: { user },
  } = useContext(UserContext);

  const avatars = {
    patient: {
      svg: <ProfilePatient />,
      description: t('Register.Account.Patient'),
    },
    medicalProfessional: {
      svg: <ProfileMP />,
      description: t('Register.Account.MedicalProfessional'),
    },
    referent: {
      svg: <ProfileReferent />,
      description: t('Register.Account.Referent'),
    },
  };

  const handleSubmit = ({
    email,
    firstName,
    lastName,
    birthDate,
    password,
    confirmPassword,
  }: {
    email: string;
    firstName: string;
    lastName: string;
    birthDate: null;
    password: string;
    confirmPassword: string;
  }) => {
    alert('hello');
    // login({ variables: { loginData: { email, password } } });
  };

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Line />
          <SectionTitle>{t('Profile.Title')}</SectionTitle>
          <Line />
        </TitleWrapper>
        <AccountWrapper>
          <AvatarWrapper>{user && avatars[user.account].svg}</AvatarWrapper>
          <UserDesc>{user && avatars[user.account].description}</UserDesc>
        </AccountWrapper>
        <InfoWrapper>
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              birthDate: null,
              password: '',
              confirmPassword: '',
            }}
            validationSchema={ValidateProfileSchema}
            onSubmit={handleSubmit}
          >
            {(
              props: FormikProps<{
                email: string;
                firstName: string;
                lastName: string;
                birthDate: null;
                password: string;
                confirmPassword: string;
              }>,
            ) => (
              <FormikForm>
                <FieldWrapper>
                  <Left>
                    <UserInfo props={props} />
                  </Left>
                  <Right>
                    <SecurityInfo props={props} />
                  </Right>
                </FieldWrapper>
                <ButtonWrapper>
                  <SaveButton
                    type="submit"
                    label={t('Profile.Save')}
                    btnStyle="primary"
                    data-testid="save-button"
                    shadow
                    iconEnd={save}
                  />
                </ButtonWrapper>
              </FormikForm>
            )}
          </Formik>
        </InfoWrapper>
      </Wrapper>
    </Container>
  );
};

export default Profile;