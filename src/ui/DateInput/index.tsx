import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fr from 'date-fns/locale/fr';
import Input from '../Input';

type Props = {
  value: Date | null | undefined;
  icon?: JSX.Element;
  onChange: (date: Date | [Date, Date] | null) => any;
};

registerLocale('fr', fr);

const DateInput = ({ value, icon, onChange, ...props }: Props): JSX.Element => {
  return (
    <DatePicker
      {...props}
      customInput={<Input icon={icon} value="test" type="text" />}
      selected={value}
      onChange={(date) => onChange(date)}
      locale="fr"
      dateFormat="dd/MM/yyyy"
    />
  );
};

DateInput.defaultProps = {
  icon: undefined,
};

export default DateInput;
