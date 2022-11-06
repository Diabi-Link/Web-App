import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form as FormikForm, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { save } from 'react-icons-kit/fa/save';
import { ValidateProfileSchema } from './Validation';

import { ReactComponent as ProfilePatient } from '../../../assets/svgs/ProfilePatient.svg';
import { ReactComponent as ProfileMP } from '../../../assets/svgs/ProfileMP.svg';
import { ReactComponent as ProfileReferent } from '../../../assets/svgs/ProfileReferent.svg';

import { UserActionTypes, UserContext } from '../../../contexts/UserContext';
import { MainContext, ContextActionTypes } from '../../../contexts/MainContext';
import { useUpdateUser } from '../../../api';

import UserInfo from './UserInfo';
import SecurityInfo from './SecurityInfo';
import Membership from './Membership';

import { PageTitle } from '../../../ui/Heading';
import Button from '../../../ui/Button';
import Loader from '../../../ui/Loader';

const Profile = (): React.ReactElement => {
  const { t } = useTranslation();
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);
  const { dispatch: altDispatch } = useContext(MainContext);

  const [updateUser, { loading }] = useUpdateUser({
    onCompleted: (payload) => {
      dispatch({
        type: UserActionTypes.FetchUser,
        payload: payload.UpdateUser,
      });
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: 'Sauvegarde réussie',
          noticeStyle: 'green',
          persistent: false,
          closeable: false,
          duration: 5000,
        },
      });
    },
  });

  const avatars = {
    patient: {
      svg: <ProfilePatient />,
      description: t('Register.Account.Patient'),
    },
    medicalProfessional: {
      svg: <ProfileMP />,
      description: t('Register.Account.MedicalPro'),
    },
    referent: {
      svg: <ProfileReferent />,
      description: t('Register.Account.Referent'),
    },
  };

  const handleSubmit = async (
    {
      email,
      firstName,
      lastName,
      birthDate,
      newPassword,
      phone,
    }: {
      email: string;
      firstName: string;
      lastName: string;
      birthDate: Date | null | undefined;
      newPassword: string;
      confirmNewPassword: string;
      acutalPassword: string;
      phone: string;
    },
    { resetForm }: { resetForm: () => void },
  ) => {
    const password = newPassword || '';
    await updateUser({
      variables: {
        userInfo: { email, firstName, lastName, birthDate, password, phone },
      },
    });
    resetForm();
  };

  return (
    <Container data-testid="profile-page">
      <Wrapper>
        <PageTitle level={1}>{t('Profile.Title')}</PageTitle>
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
              acutalPassword: '',
              newPassword: '',
              confirmNewPassword: '',
              phone: '',
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
                acutalPassword: string;
                newPassword: string;
                confirmNewPassword: string;
                phone: string;
              }>,
            ) => (
              <FormikForm>
                <FieldWrapper>
                  <SectionWrapper>
                    <UserInfo props={props} />
                  </SectionWrapper>
                  <SectionWrapper>
                    <SecurityInfo props={props} />
                  </SectionWrapper>
                  <SectionWrapper>
                    <Membership props={props} />
                  </SectionWrapper>
                </FieldWrapper>
                <ButtonWrapper>
                  <SaveButton
                    type="submit"
                    label={
                      loading ? (
                        <Loader loaderStyle="white" />
                      ) : (
                        t('Profile.Save')
                      )
                    }
                    btnStyle="primary"
                    data-testid="save-button"
                    shadow
                    iconEnd={save}
                    disabled={loading}
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
  align-items: center;
  width: 80vw;
  height: 100vh;
`;

const AccountWrapper = styled.div`
  display: flex;
  width: 100%;
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
  color: ${({ theme }) => theme.main.primaryLight};
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
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  display: flex;
  width: 100%;

  & > form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;

  @media (min-width: 1200px) {
    width: 37%;
    :last-child {
      width: 25%;
    }
  }
`;

const SaveButton = styled(Button)`
  margin-top: 2rem;
`;

export default Profile;
