import React from 'react';

type Props = {
  label: string | JSX.Element;
  onClick: () => void;
  type: 'primary' | 'primaryLight';
  outlined: boolean;
  lg: boolean;
};

const Button = ({ label, onClick, type, outlined, lg, ...buttonProps }: Props): JSX.Element => {

  return (
    <button
      type="button"
      onClick={onClick}
      {...buttonProps}
    >
      {label}
    </button>
  );
};

export default Button;
