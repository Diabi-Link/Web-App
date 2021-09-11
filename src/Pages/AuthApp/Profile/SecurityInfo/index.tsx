/* eslint-disable react/prop-types */
import React, { /* useContext, */ useState } from 'react';
import styled from 'styled-components';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';

import { eye } from 'react-icons-kit/icomoon/eye';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';

// import { UserContext } from '../../../../contexts/UserContext';

import Input from '../../../../ui/Input';

type Props = {
  props: FormikProps<{
    email: string;
    firstName: string;
    lastName: string;
    birthDate: null;
    password: string;
    confirmPassword: string;
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
  display: flex;
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
  flex: 1;
  height: 1px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 15px 0px 15px 0px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin: 15px 5px;
`;

const SecurityInfo = ({ props }: Props) => {
  // const {
  //   state: { user },
  // } = useContext(UserContext);
  const { t } = useTranslation();

  const [showActualPassword, setShowActualPassword] = useState(false);
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
        <InputLabel>{t('Profile.ActualPassword')}</InputLabel>
        <Input
          name="actualPassword"
          type={showActualPassword ? 'text' : 'password'}
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
          icon={showActualPassword ? eye : eyeBlocked}
          onClick={() => setShowActualPassword(!showActualPassword)}
          data-testid="actualPassword-input"
        />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>{t('Profile.NewPassword')}</InputLabel>
        <Input
          name="newPassword"
          type={showNewPassword ? 'text' : 'password'}
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
          value={props.values.confirmPassword}
          onChange={(e) => {
            props.handleChange(e);
          }}
          errorText={
            props.errors.confirmPassword && props.touched.confirmPassword
              ? props.errors.confirmPassword
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

export default SecurityInfo;
