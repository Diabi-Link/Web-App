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
}: Omit<GettersArguments, 'outlined'>): string => {
  switch (btnStyle) {
    case 'primary':
      return theme.main.primary;
    case 'primaryLight':
      return theme.main.primaryLight;
    case 'white':
      return theme.main.white;
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
      return outlined ? theme.main.white : theme.main.primary;
    case 'primaryLight':
      return outlined ? theme.main.white : theme.main.primaryLight;
    case 'white':
      return outlined ? theme.main.primary : theme.main.white;
    default:
      return theme.main.grayLight;
  }
};

const getLabelColor = ({
  btnStyle,
  theme,
}: Omit<GettersArguments, 'outlined'>): string => {
  switch (btnStyle) {
    case 'primary':
      return theme.main.white;
    case 'primaryLight':
      return theme.main.white;
    case 'white':
      return theme.main.primary;
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
      return theme.main.darkLighter;
    case 'primaryLight':
      return theme.main.primaryLighter;
    case 'white':
      return theme.main.darkLighter;
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
  border: 0.12rem solid
    ${({ btnStyle, theme, outlined }) =>
      getBorderColor({ btnStyle, theme, outlined })};
  border-radius: 10px;
  color: ${({ btnStyle, theme }) => getLabelColor({ btnStyle, theme })};

  background-color: ${({ btnStyle, theme }) =>
    getBackgroundColor({ btnStyle, theme })};

  box-shadow: ${({ theme, shadow }) =>
    shadow ? `2px 3px 4px ${theme.main.darkLighter}` : 'none'};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  &:hover:not(:disabled) {
    background-color: ${({ btnStyle, theme }) =>
      darken(0.1, getBackgroundColor({ btnStyle, theme }))};
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
    border: 0.12rem solid
      ${({ btnStyle, theme, outlined }) =>
        getBorderColor({ btnStyle, theme, outlined })};
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
