/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';

import { calendar } from 'react-icons-kit/icomoon/calendar';
import { user as iconUser } from 'react-icons-kit/fa/user';
import { ic_mail as mail } from 'react-icons-kit/md/ic_mail';

import { UserContext } from '../../../../contexts/UserContext';

import Input from '../../../../ui/Input';
import PhoneInput from '../../../../ui/PhoneInput';
import DateInput from '../../../../ui/DateInput';
import { capitalize } from '../../../../utils';

type Props = {
  props: FormikProps<{
    email: string;
    firstName: string;
    lastName: string;
    birthDate: null;
    newPassword: string;
    confirmNewPassword: string;
    acutalPassword: string;
    phone: string;
  }>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  flex: 1;
`;

const SectionWrapper = styled.div`
  display: flex;
`;

const SectionTitle = styled.label`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.main.primary};
  margin: 15px;
`;

const LineStart = styled.div`
  margin: auto 0;
  border: 2px solid ${(props) => props.theme.main.primary};
  background-color: ${(props) => props.theme.main.primary};
  width: 10%;
  height: 1px;
`;

const LineEnd = styled.div`
  margin: auto 0;
  border: 2px solid ${(props) => props.theme.main.primary};
  background-color: ${(props) => props.theme.main.primary};
  flex: 1 0 auto;
  height: 1px;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 15px 0px 15px 0px;
  &:first-child {
    margin-right: 30px;
  }
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin: 15px 5px;
`;

const UserInfo = ({ props }: Props) => {
  const {
    state: { user },
  } = useContext(UserContext);
  const { t } = useTranslation();

  return (
    <Wrapper>
      <SectionWrapper>
        <LineStart />
        <SectionTitle>{t('Profile.User')}</SectionTitle>
        <LineEnd />
      </SectionWrapper>

      <InfoBox>
        <InputWrapper>
          <InputLabel>{t('Register.User.FirstName')}</InputLabel>
          <Input
            name="firstName"
            type="text"
            data-testid="firstName-input"
            placeholder={user?.firstName}
            value={capitalize(props.values.firstName)}
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
            placeholder={user?.lastName}
            value={capitalize(props.values.lastName)}
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
          <InputLabel>{t('Profile.PhoneNumber')}</InputLabel>
          <PhoneInput
            value={props.values.phone}
            data-testid="phone-input"
            placeholder={user?.phone || t('Profile.ToFill')}
            errorText={
              props.errors.phone && props.touched.phone
                ? props.errors.phone
                : undefined
            }
            onChange={(e) => {
              props.handleChange(e);
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>{t('Register.User.BirthDate')}</InputLabel>
          <DateInput
            value={props.values.birthDate}
            placeholderText={user?.birthDate.toLocaleDateString()}
            errorText={
              props.errors.birthDate && props.touched.birthDate
                ? props.errors.birthDate
                : undefined
            }
            onChange={(date) => {
              props.setFieldValue('birthDate', date);
            }}
            icon={calendar}
            showYearDropdown
          />
        </InputWrapper>
      </InfoBox>
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
    </Wrapper>
  );
};

export default UserInfo;
