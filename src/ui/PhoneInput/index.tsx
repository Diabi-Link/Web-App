import React, { createRef, useMemo } from 'react';
import styled from 'styled-components';
import PhoneNumber from 'awesome-phonenumber';

import { arrowDown2 } from 'react-icons-kit/icomoon/arrowDown2';
import { phone as PhoneIcon } from 'react-icons-kit/icomoon/phone';

import countries from './countries';
import Input from '../Input';
import Select from '../Select';

type Props = {
  value: string;
  errorText?: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
};

const PhoneWrapper = styled.div`
  display: flex;
`;

const Test = styled.img``;

const PhoneInput = ({ value, errorText, onChange }: Props) => {
  const phoneNumberInput = createRef();
  // const phoneCode = value ? getPhoneCode(value) || '+33' : '+33';
  // const number = value ? value.slice(phoneCode.length) : '';

  // const phoneCodes = useMemo(
  //   () =>
  //     prefixPhone.map((p) => ({
  //       spaced: p[0],
  //       clean: p[0].replace(/ /g, ''),
  //       iso: p[1],
  //     })),
  //   [],
  // );

  // const checkPhoneNumber = () => {
  //   const { current: phoneNumberRef } = phoneNumberInput;
  //   if (PhoneNumber(phoneCode + number).isValid()) {
  //     phoneNumberRef.setCustomValidity('');
  //   } else {
  //     phoneNumberRef.setCustomValidity(
  //       t("Le numéro de téléphone n'est pas valide."),
  //     );
  //   }
  // };

  // const getISO = (code: string) =>
  //   phoneCodes?.find((p) => p.clean === code)?.iso;

  // console.log(
  //   `../../assets/svgs/flags/${getISO(phoneCode)?.toLowerCase()}.svg`,
  // );
  return (
    <PhoneWrapper>
      <Select
        name="phoneNumber"
        type="text"
        data-testid="phoneNumber-input"
        value={countries[72].code}
        onChange={(e) => onChange(e)}
        errorText={errorText}
        svg={countries[72].svg}
        icon={arrowDown2}
      />
      <Input
        name="phoneNumber"
        type="tel"
        data-testid="phoneNumber-input"
        placeholder="602030405"
        value={value}
        onChange={(e) => onChange(e)}
        // onChange={({ target }) => {
        //   onChange({ name: 'phoneNumber', value: phoneCode + target.value });
        // }}
        errorText={errorText}
        icon={PhoneIcon}
      />
    </PhoneWrapper>
  );
};

// {
//   label: phoneCodes?.find((p) => p.clean === phoneCode)?.spaced,
//   value: phoneCode,
//   customElement: <Test />,
// }

export default PhoneInput;
