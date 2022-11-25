import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { Theme } from '../../theme';

export type ButtonTheme =
  | 'primary'
  | 'primaryLight'
  | 'white'
  | 'default'
  | 'green'
  | 'red';

type Props = {
  label: string | JSX.Element;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => any;
  outlined?: boolean;
  shadow?: boolean;
  iconStart?: typeof Icon;
  iconEnd?: typeof Icon;
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
      return outlined ? theme.main.primary : theme.main.primaryLight;
    case 'primaryLight':
      return theme.main.primaryLight;
    case 'white':
      return theme.main.white;
    case 'green':
      return theme.main.greenLighter;
    case 'red':
      return theme.main.redLighter;
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
      return outlined ? theme.main.white : theme.main.primaryLight;
    case 'primaryLight':
      return outlined ? theme.main.white : theme.main.primaryLight;
    case 'white':
      return outlined ? theme.main.primary : theme.main.white;
    case 'green':
      return outlined ? theme.main.green : theme.main.greenLighter;
    case 'red':
      return outlined ? theme.main.red : theme.main.redLighter;
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
      return outlined ? theme.main.white : theme.main.darkBlue;
    case 'primaryLight':
      return theme.main.white;
    case 'white':
      return theme.main.primary;
    case 'green':
      return theme.main.darkGreen;
    case 'red':
      return theme.main.darkRed;
    default:
      return theme.main.dark;
  }
};

const getShadowColor = ({
  btnStyle,
  theme,
}: Omit<GettersArguments, 'outlined'>): string => {
  switch (btnStyle) {
    case 'primary':
      return theme.main.blueLight;
    case 'primaryLight':
      return theme.main.primaryLighter;
    case 'white':
      return theme.main.darkLighter;
    case 'green':
      return theme.main.greenLighter;
    case 'red':
      return theme.main.redLighter;
    default:
      return theme.main.primaryLight;
  }
};

const ButtonElement = styled.button<{
  btnStyle: ButtonTheme;
  outlined?: boolean;
  shadow?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 0.7rem 1.2rem;
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  justify-content: center;
  border: 2px solid
    ${({ btnStyle, theme, outlined }) =>
      getBorderColor({ btnStyle, theme, outlined })};
  border-radius: 10px;
  color: ${({ btnStyle, theme, outlined }) =>
    getLabelColor({ btnStyle, theme, outlined })};

  background-color: ${({ btnStyle, theme, outlined }) =>
    getBackgroundColor({ btnStyle, theme, outlined })};

  box-shadow: ${({ btnStyle, theme, shadow }) => {
    if (shadow)
      return `2px 5px 4px ${getShadowColor({
        btnStyle,
        theme,
      })}`;
    return 'none';
  }};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

const StyledIconStart = styled(Icon)`
  margin-right: 0.7rem;
`;

const StyledIconEnd = styled(Icon)`
  margin-left: 0.7rem;
`;

const Button = ({
  label,
  onClick,
  iconStart,
  iconEnd,
  type,
  ...buttonProps
}: Props): JSX.Element => {
  return (
    <ButtonElement type={type} onClick={onClick} {...buttonProps}>
      {iconStart && <StyledIconStart icon={iconStart} size={20} />}
      {label}
      {iconEnd && <StyledIconEnd icon={iconEnd} size={20} />}
    </ButtonElement>
  );
};

Button.defaultProps = {
  type: 'button',
  onClick: undefined,
  outlined: false,
  shadow: false,
  iconStart: null,
  iconEnd: null,
};

export default Button;
