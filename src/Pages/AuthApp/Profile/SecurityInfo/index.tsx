/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';

import { eye } from 'react-icons-kit/icomoon/eye';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';

import Input from '../../../../ui/Input';

type Props = {
  props: FormikProps<{
    newPassword: string;
    confirmNewPassword: string;
  }>;
};

const SecurityInfo = ({ props }: Props) => {
  const { t } = useTranslation();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Wrapper>
      <SectionWrapper>
        <LineStart />
        <SectionTitle>{t('Profile.Security')}</SectionTitle>
        <LineEnd />
      </SectionWrapper>

      <InputWrapper>
        <InputLabel>{t('Profile.NewPassword')}</InputLabel>
        <Input
          name="newPassword"
          type={showNewPassword ? 'text' : 'password'}
          placeholder="•••••••••"
          value={props.values.newPassword}
          onChange={(e) => {
            props.handleChange(e);
          }}
          errorText={
            props.errors.newPassword && props.touched.newPassword
              ? props.errors.newPassword
              : undefined
          }
          icon={showNewPassword ? eye : eyeBlocked}
          onClick={() => setShowNewPassword(!showNewPassword)}
          data-testid="newPassword-input"
        />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>{t('Profile.ConfirmNewPassword')}</InputLabel>
        <Input
          name="confirmNewPassword"
          type={showConfirm ? 'text' : 'password'}
          placeholder="•••••••••"
          value={props.values.confirmNewPassword}
          onChange={(e) => {
            props.handleChange(e);
          }}
          errorText={
            props.errors.confirmNewPassword && props.touched.confirmNewPassword
              ? props.errors.confirmNewPassword
              : undefined
          }
          icon={showConfirm ? eye : eyeBlocked}
          onClick={() => setShowConfirm(!showConfirm)}
          data-testid="confirmPassword-input"
        />
      </InputWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  flex: 1;
`;

const SectionWrapper = styled.div`
  display: flex;
`;

const SectionTitle = styled.label`
  display: flex;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.main.primaryLight};
  margin: 15px;
`;

const LineStart = styled.div`
  margin: auto 0;
  border: 2px solid ${({ theme }) => theme.main.primaryLight};
  background-color: ${({ theme }) => theme.main.primaryLight};
  width: 10%;
  height: 1px;
`;

const LineEnd = styled.div`
  margin: auto 0;
  border: 2px solid ${({ theme }) => theme.main.primaryLight};
  background-color: ${({ theme }) => theme.main.primaryLight};
  flex: 1;
  height: 1px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 15px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin: 15px 5px;
`;

export default SecurityInfo;
