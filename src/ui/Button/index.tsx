import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { Icon } from 'react-icons-kit';
import { Theme } from '../../theme';

export type ButtonTheme = 'primary' | 'primaryLight' | 'white' | 'default';

type Props = {
  label: string | JSX.Element;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => any;
  outlined?: boolean;
  shadow?: boolean;
  icon?: JSX.Element;
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
    case 'white':
      return outlined ? theme.main.primary : theme.main.white;
    default:
      return theme.main.whiteBroken;
  }
};

const getBorderColor = ({
  btnStyle,
  theme,
}: Omit<GettersArguments, 'outlined'>): string => {
  switch (btnStyle) {
    case 'primary':
      return theme.main.primary;
    case 'primaryLight':
      return theme.main.primaryLight;
    case 'white':
      return theme.main.white;
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
    case 'white':
      return outlined ? theme.main.white : theme.main.grayDarker;
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
      return theme.main.primaryLight;
    case 'primaryLight':
      return theme.main.primaryLighter;
    case 'white':
      return theme.main.white;
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
  font-size: 1rem;
  white-space: nowrap;
  transition: 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  justify-content: center;
  border: 0.0625rem solid
    ${({ btnStyle, theme }) => getBorderColor({ btnStyle, theme })};
  border-radius: 10px;
  color: ${({ btnStyle, theme, outlined }) =>
    getLabelColor({ btnStyle, theme, outlined })};

  background-color: ${({ btnStyle, theme, outlined }) =>
    getBackgroundColor({ btnStyle, theme, outlined })};

  box-shadow: ${({ btnStyle, theme, shadow }) =>
    shadow
      ? `2px 3px 4px ${getShadowColor({
          btnStyle,
          theme,
        })}`
      : 'none'};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  &:hover:not(:disabled) {
    background-color: ${({ btnStyle, theme, outlined }) =>
      outlined
        ? 'none'
        : darken(0.1, getBackgroundColor({ btnStyle, theme, outlined }))};
    box-shadow: ${({ btnStyle, theme, outlined, shadow }) => {
      if (outlined)
        return `0px 0px 7px 1px ${darken(
          0.1,
          getShadowColor({
            btnStyle,
            theme,
          }),
        )}`;
      if (shadow)
        return `2px 3px 4px ${getShadowColor({
          btnStyle,
          theme,
        })}`;
      return 'none';
    }};
    border: 0.0625rem solid
      ${({ btnStyle, theme, outlined }) =>
        outlined ? 'transparent' : getBorderColor({ btnStyle, theme })};
  }
`;

const StyledIcon = styled(Icon)`
  margin-left: 0.7rem;
`;

const Button = ({
  label,
  onClick,
  icon,
  type,
  ...buttonProps
}: Props): JSX.Element => {
  return (
    <ButtonElement type={type} onClick={onClick} {...buttonProps}>
      {label}
      {icon && <StyledIcon icon={icon} size={20} />}
    </ButtonElement>
  );
};

Button.defaultProps = {
  type: 'button',
  onClick: undefined,
  outlined: false,
  shadow: false,
  icon: null,
};

export default Button;
