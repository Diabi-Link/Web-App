import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { Theme } from '../../theme';

export type ButtonTheme = 'primary' | 'primaryLight' | 'default';

type Props = {
  label: string | JSX.Element;
  onClick?: () => any;
  outlined?: boolean;
  btnStyle: ButtonTheme;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

type GettersArguments = {
  btnStyle: ButtonTheme;
  theme: Theme;
  outlined: boolean | undefined;
};

const getBackgroundColor = ({
  btnStyle,
  theme,
  outlined,
}: GettersArguments): string => {
  switch (btnStyle) {
    case 'primary':
      return outlined ? theme.main.white : theme.main.primary;
    case 'primaryLight':
      return outlined ? theme.main.white : theme.main.primaryLight;
    default:
      return theme.main.whiteBroken;
  }
};

const getBorderColor = ({
  btnStyle,
  theme,
  outlined,
}: GettersArguments): string => {
  switch (btnStyle) {
    case 'primary':
      return outlined ? theme.main.primary : 'transparent';
    case 'primaryLight':
      return outlined ? theme.main.primaryLight : 'transparent';
    default:
      return theme.main.grayLight;
  }
};

const getLabelColor = ({
  btnStyle,
  theme,
  outlined,
}: GettersArguments): string => {
  switch (btnStyle) {
    case 'primary':
      return outlined ? theme.main.primary : theme.main.white;
    case 'primaryLight':
      return outlined ? theme.main.primaryLight : theme.main.white;
    default:
      return theme.main.dark;
  }
};

const ButtonElement = styled.button<{
  btnStyle: 'primary' | 'primaryLight' | 'default';
  outlined?: boolean;
}>`
  display: inline-flex;
  cursor: pointer;
  padding: 0.6rem 1.2rem;
  font-weight: 700;
  font-size: 1rem;
  white-space: nowrap;
  transition: ease;
  justify-content: center;
  border: 0.0625rem solid
    ${({ btnStyle, theme, outlined }) =>
      getBorderColor({ btnStyle, theme, outlined })};
  border-radius: 0.35rem;
  color: ${({ btnStyle, theme, outlined }) =>
    getLabelColor({ btnStyle, theme, outlined })};

  background-color: ${({ btnStyle, theme, outlined }) =>
    getBackgroundColor({ btnStyle, theme, outlined })};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  &:hover:not(:disabled) {
    background-color: ${({ btnStyle, theme, outlined }) =>
      outlined
        ? 'none'
        : darken(0.1, getBackgroundColor({ btnStyle, theme, outlined }))};
  }

  &:active:not(:disabled) {
    background-color: ${({ btnStyle, theme, outlined }) =>
      outlined
        ? 'none'
        : darken(0.2, getBackgroundColor({ btnStyle, theme, outlined }))};
  }
`;

const Button = ({ label, onClick, ...buttonProps }: Props): JSX.Element => {
  const handleClick = (): void => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <ButtonElement type="button" onClick={handleClick} {...buttonProps}>
      {label}
    </ButtonElement>
  );
};

Button.defaultProps = {
  onClick: undefined,
  outlined: false,
};

export default Button;
