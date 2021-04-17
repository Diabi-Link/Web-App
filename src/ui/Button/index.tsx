import React from 'react';
import styled from 'styled-components';

export type ButtonTheme = 'primary' | 'primaryLight';

type Props = {
  label: string | JSX.Element;
  onClick: () => void;
  theme: ButtonTheme;
  outlined: boolean;
  lg: boolean;
};

const ButtonElement = styled.button<{
  theme: 'primary' | 'primaryLight';
  outlined: boolean;
  lg: boolean;
}>``;

const Button = ({ label, onClick, ...buttonProps }: Props): JSX.Element => {
  return (
    <ButtonElement type="button" onClick={onClick} {...buttonProps}>
      {label}
    </ButtonElement>
  );
};

export default Button;
