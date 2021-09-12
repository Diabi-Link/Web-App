import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fr from 'date-fns/locale/fr';
import Input from '../Input';

type Props = {
  value: Date | null | undefined;
  icon?: JSX.Element;
  errorText?: string | undefined;
  placeholderText?: string;
  onChange: (date: Date | [Date, Date] | null) => any;
};

registerLocale('fr', fr);

const DateInput = ({
  value,
  icon,
  errorText,
  onChange,
  placeholderText,
  ...props
}: Props): JSX.Element => {
  return (
    <DatePicker
      {...props}
      customInput={
        <Input
          errorText={errorText}
          icon={icon}
          value="test"
          type="text"
          data-testid="birthDate-input"
        />
      }
      placeholderText={placeholderText || '15/04/1980'}
      selected={value}
      onChange={(date) => onChange(date)}
      locale="fr"
      dateFormat="dd/MM/yyyy"
    />
  );
};

DateInput.defaultProps = {
  icon: undefined,
  errorText: undefined,
};

export default DateInput;
