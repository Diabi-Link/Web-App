import React, { useCallback, useContext, useRef } from 'react';
import styled from 'styled-components';
import { Formik, Form as FormikForm, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { save } from 'react-icons-kit/fa/save';
import axios from 'axios';
import { useAuthToken } from '../../../hooks/useAuthToken';
import { PictureContext } from '../../../contexts/PictureContext';
import { ValidatePasswordSchema, ValidateProfileSchema } from './Validation';

import { ReactComponent as ProfilePatient } from '../../../assets/svgs/ProfilePatient.svg';
import { ReactComponent as ProfileMP } from '../../../assets/svgs/ProfileMP.svg';
import { ReactComponent as ProfileReferent } from '../../../assets/svgs/ProfileReferent.svg';

import { UserActionTypes, UserContext } from '../../../contexts/UserContext';
import { MainContext, ContextActionTypes } from '../../../contexts/MainContext';
import {
  useRemovePicture,
  useUpdatePicture,
  useUpdateUser,
} from '../../../api';

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
  const { picture, pictureLoading, setPicture, setPictureLoading } = useContext(
    PictureContext,
  );
  const inputFile = useRef<HTMLInputElement | null>(null);
  const { authToken } = useAuthToken();

  const [updatePicture] = useUpdatePicture({
    onCompleted: () => {
      setPictureLoading(true);
      savePicture();
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: 'Photo modifiée',
          noticeStyle: 'green',
          persistent: false,
          closeable: true,
          duration: 2000,
        },
      });
    },
  });

  const [removePicture] = useRemovePicture({
    onCompleted: () => {
      setPicture(null);
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: 'Photo supprimée',
          noticeStyle: 'green',
          persistent: false,
          closeable: true,
          duration: 2000,
        },
      });
    },
  });

  const [updateUser, { loading }] = useUpdateUser({
    onCompleted: (payload) => {
      dispatch({
        type: UserActionTypes.FetchUser,
        payload: payload.UpdateUser,
      });
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: 'Utilisateur modifié',
          noticeStyle: 'green',
          persistent: false,
          closeable: true,
          duration: 2000,
        },
      });
    },
  });

  const [updateUserPassword, { loading: passwordLoading }] = useUpdateUser({
    onCompleted: (payload) => {
      dispatch({
        type: UserActionTypes.FetchUser,
        payload: payload.UpdateUser,
      });
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: 'Mot de passe modifié',
          noticeStyle: 'green',
          persistent: false,
          closeable: false,
          duration: 2000,
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

  const handleSubmitPassword = async (
    {
      newPassword,
    }: {
      newPassword?: string;
      confirmNewPassword?: string;
      actualPassword?: string;
    },
    { resetForm }: { resetForm: () => void },
  ) => {
    const password = newPassword || '';
    await updateUserPassword({
      variables: {
        userInfo: { password },
      },
    });
    resetForm();
  };

  const handleSubmit = async (
    {
      email,
      firstName,
      lastName,
      birthDate,
      phone,
    }: {
      email?: string;
      firstName?: string;
      lastName?: string;
      birthDate?: Date | null | undefined;
      phone?: string;
    },
    { resetForm }: { resetForm: () => void },
  ) => {
    await updateUser({
      variables: {
        userInfo: { email, firstName, lastName, birthDate, phone },
      },
    });
    resetForm();
  };

  const openInputFile = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const fetchPicture = useCallback(() => {
    return axios
      .create({
        baseURL: 'https://diabilink.herokuapp.com/',
        headers: {
          authorization: `Bearer ${authToken}`,
          'Access-Control-Allow-Origin': '*',
          Accept: `application/json, image/png;`,
        },
      })
      .get('getPicture', {
        responseType: 'blob',
      });
  }, [authToken]);

  const savePicture = useCallback(async () => {
    try {
      const { data } = await fetchPicture();
      if (!(data instanceof Blob && data.type === 'application/json')) {
        setPicture(URL.createObjectURL(data));
      } else {
        setPictureLoading(false);
      }
    } catch {
      // eslint-disable-next-line no-console
      console.error('error when fetching picture');
      setPictureLoading(false);
    }
  }, [fetchPicture, setPicture, setPictureLoading]);
  if (!user) return <Loader loaderStyle="white" />;

  return (
    <Container data-testid="profile-page">
      <Wrapper>
        <PageTitle level={1}>{t('Profile.Title')}</PageTitle>
        <AccountWrapper>
          <PictureWrapper>
            {pictureLoading && (
              <LoaderContainer>
                <Loader />
              </LoaderContainer>
            )}
            {!pictureLoading && !picture && (
              <AvatarWrapper>{user && avatars[user.account].svg}</AvatarWrapper>
            )}
            {!pictureLoading && picture !== null && (
              <ImgWrapper alt="profil-picture" src={picture} />
            )}
            <input
              type="file"
              id="file"
              accept="image/png, image/jpeg"
              ref={inputFile}
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  updatePicture({
                    variables: {
                      picture: e.target.files[0],
                    },
                  });
                }
              }}
            />
            <ModifyText onClick={openInputFile}>
              Modifier la photo de profil
            </ModifyText>

            <DeleteText
              onClick={() => removePicture()}
              style={
                picture === null
                  ? {
                      visibility: 'hidden',
                    }
                  : {}
              }
            >
              Supprimer la photo de profil
            </DeleteText>
          </PictureWrapper>
          <UserDesc>{user && avatars[user.account].description}</UserDesc>
        </AccountWrapper>
        <InfoWrapper>
          <FieldWrapper>
            <Left patient={user?.account === 'patient'}>
              <Formik
                initialValues={{
                  email: '',
                  firstName: '',
                  lastName: '',
                  birthDate: null,
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
                    phone: string;
                  }>,
                ) => (
                  <FormikForm
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <UserInfo props={props} />
                    <ButtonWrapper>
                      <SaveButton
                        type="submit"
                        label={
                          loading ? (
                            <Loader loaderStyle="white" />
                          ) : (
                            t('Profile.UpdateProfil')
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
            </Left>
            <Center patient={user?.account === 'patient'}>
              <Formik
                initialValues={{
                  newPassword: '',
                  confirmNewPassword: '',
                }}
                validationSchema={ValidatePasswordSchema}
                onSubmit={handleSubmitPassword}
              >
                {(
                  props: FormikProps<{
                    newPassword: string;
                    confirmNewPassword: string;
                  }>,
                ) => (
                  <FormikForm>
                    <SecurityInfo props={props} />

                    <ButtonWrapper>
                      <SaveButton
                        type="submit"
                        label={
                          passwordLoading ? (
                            <Loader loaderStyle="white" />
                          ) : (
                            t('Profile.UpdatePassword')
                          )
                        }
                        btnStyle="primary"
                        data-testid="save-button"
                        shadow
                        iconEnd={save}
                        disabled={passwordLoading}
                      />
                    </ButtonWrapper>
                  </FormikForm>
                )}
              </Formik>
            </Center>
            {user?.account !== 'patient' && (
              <Right>
                <Membership
                  role={user.account}
                  isPaid={user.isPaid}
                  expire={user?.expire}
                  sub={user?.ProductSub}
                />
              </Right>
            )}
          </FieldWrapper>
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

const PictureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 8px;
`;
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin-bottom: 8px;
`;

const ImgWrapper = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 8px;
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
  margin-top: auto;
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

const Left = styled.div<{ patient: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 1200px) {
    width: ${({ patient }) => (patient ? '48%' : '47%')};
  }
`;

const Center = styled.div<{ patient: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 5vw;

  @media (min-width: 1200px) {
    width: ${({ patient }) => (patient ? '48%' : '22%')};
    margin: 0;
  }

  & > form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 5vw;

  @media (min-width: 1200px) {
    width: 22%;
    margin: 0;
  }
`;

const SaveButton = styled(Button)`
  margin: 20px 0;
`;

const DeleteText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.main.red};
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

const ModifyText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.main.primary};
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 8px;
`;

export default Profile;
