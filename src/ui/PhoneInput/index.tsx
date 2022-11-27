import React from 'react';
import styled from 'styled-components';

import { phone as PhoneIcon } from 'react-icons-kit/icomoon/phone';

import countries from './countries';
import Input from '../Input';
import Select from '../Select';

type Props = {
  value: string;
  placeholder?: string;
  errorText?: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
};

const PhoneWrapper = styled.div`
  display: flex;

  & > div:first-child {
    width: 30%;
  }

  & > div:last-child {
    width: 70%;
  }
`;

const PhoneInput = ({ value, errorText, onChange, placeholder }: Props) => {
  return (
    <PhoneWrapper>
      <Select
        name="phoneNumber"
        type="text"
        data-testid="phoneNumber-input"
        value={countries[72].code}
        onChange={(e) => onChange(e)}
        svg={countries[72].svg}
      />
      <Input
        name="phone"
        type="tel"
        data-testid="phone-input"
        placeholder={placeholder || '602030405'}
        value={value}
        onChange={(e) => onChange(e)}
        errorText={errorText}
        icon={PhoneIcon}
      />
    </PhoneWrapper>
  );
};

export default PhoneInput;
