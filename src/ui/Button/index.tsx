import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { Theme } from '../../theme';

export type ButtonTheme = 'primary' | 'primaryLight' | 'default';

type Props = {
  label: string | JSX.Element;
  onClick: () => void;
  btnStyle: ButtonTheme;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

const getBackgroundColor = (btnStyle: ButtonTheme, theme: Theme): string => {
  switch (btnStyle) {
    case 'primary':
      return theme.main.primary;
    case 'primaryLight':
      return theme.main.primaryLight;
    default:
      return theme.main.whiteBroken;
  }
};

const getBorderColor = (btnStyle: ButtonTheme, theme: Theme): string => {
  switch (btnStyle) {
    case 'primary':
    case 'primaryLight':
      return 'transparent';
    default:
      return theme.main.grayLight;
  }
};

const getLabelColor = (btnStyle: ButtonTheme, theme: Theme): string => {
  switch (btnStyle) {
    case 'primary':
    case 'primaryLight':
      return theme.main.white;
    default:
      return theme.main.dark;
  }
};

const ButtonElement = styled.button<{
  btnStyle: 'primary' | 'primaryLight' | 'default';
}>`
  display: inline-flex;
  cursor: pointer;
  padding: 0.5rem 1.4rem;
  font-weight: 500;
  font-size: 1rem;
  white-space: nowrap;
  transition: ease;
  border: 0.0625rem solid
    ${(props) => getBorderColor(props.btnStyle, props.theme)};
  border-radius: 0.35rem;
  color: ${(props) => getLabelColor(props.btnStyle, props.theme)};

  background-color: ${(props) =>
    getBackgroundColor(props.btnStyle, props.theme)};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      darken(0.1, getBackgroundColor(props.btnStyle, props.theme))};
  }

  &:active:not(:disabled) {
    background-color: ${(props) =>
      darken(0.2, getBackgroundColor(props.btnStyle, props.theme))};
  }
`;

const Button = ({ label, onClick, ...buttonProps }: Props): JSX.Element => {
  return (
    <ButtonElement type="button" onClick={onClick} {...buttonProps}>
      {label}
    </ButtonElement>
  );
};

export default Button;
