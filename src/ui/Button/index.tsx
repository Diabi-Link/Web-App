import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { Icon } from 'react-icons-kit';
import { Theme } from '../../theme';

export type ButtonTheme = 'primary' | 'primaryLight' | 'default';

type Props = {
  label: string | JSX.Element;
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

const getShadowColor = ({
  btnStyle,
  theme,
  outlined,
}: GettersArguments): string => {
  switch (btnStyle) {
    case 'primary':
      return outlined ? 'transparent' : theme.main.primaryLight;
    case 'primaryLight':
      return outlined ? 'transparent' : theme.main.primaryLighter;
    default:
      return theme.main.dark;
  }
};

const ButtonElement = styled.button<{
  btnStyle: 'primary' | 'primaryLight' | 'default';
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
    ${({ btnStyle, theme, outlined }) =>
      getBorderColor({ btnStyle, theme, outlined })};
  border-radius: 10px;
  color: ${({ btnStyle, theme, outlined }) =>
    getLabelColor({ btnStyle, theme, outlined })};

  background-color: ${({ btnStyle, theme, outlined }) =>
    getBackgroundColor({ btnStyle, theme, outlined })};

  box-shadow: ${({ btnStyle, theme, outlined, shadow }) =>
    shadow
      ? `2px 5px 4px ${getShadowColor({
          btnStyle,
          theme,
          outlined,
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
    box-shadow: ${({ btnStyle, theme, outlined }) =>
      outlined
        ? `0px 0px 7px 1px ${getLabelColor({
            btnStyle,
            theme,
            outlined,
          })}`
        : 'none'};
  }
`;

const StyledIcon = styled(Icon)`
  margin-left: 0.7rem;
`;

const Button = ({
  label,
  onClick,
  icon,
  ...buttonProps
}: Props): JSX.Element => {
  const handleClick = (): void => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <ButtonElement type="button" onClick={handleClick} {...buttonProps}>
      {label}
      {icon && <StyledIcon icon={icon} size={20} />}
    </ButtonElement>
  );
};

Button.defaultProps = {
  onClick: undefined,
  outlined: false,
  shadow: false,
  icon: null,
};

export default Button;
