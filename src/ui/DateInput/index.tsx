import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from '../Input';

type Props = {
  value: Date | null | undefined;
  icon?: JSX.Element;
  onChange: (date: Date | [Date, Date] | null) => any;
};

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
