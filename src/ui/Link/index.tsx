// https://stackoverflow.com/questions/58094415/styling-react-router-dom-link-using-styled-components-getting-warning-when-passi
import React from 'react';
import styled from 'styled-components';
import { Link as LinkRouter, LinkProps } from 'react-router-dom';
import { darken } from 'polished';

import { Theme } from '../../theme';

type LinkTheme = 'primary' | 'default';

type Props = {
  children: string | React.ReactNode;
  $linkStyle?: LinkTheme;
  $bold?: boolean;
  $underline?: boolean;
} & LinkProps;

type GettersArguments = {
  $linkStyle: LinkTheme;
  theme: Theme;
};

const getLabelColor = ({ $linkStyle, theme }: GettersArguments): string => {
  switch ($linkStyle) {
    case 'primary':
      return theme.main.primary;
    default:
      return theme.main.dark;
  }
};

const StyledLink = styled(LinkRouter)<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: ${({ $underline }) => ($underline ? 'underline' : 'none')};
  font-weight: ${({ $bold }) => ($bold ? 600 : 400)};
  color: ${({ theme, $linkStyle }) =>
    getLabelColor({ theme, $linkStyle: $linkStyle as LinkTheme })};
  &:hover {
    color: ${({ theme, $linkStyle }) =>
      darken(
        0.1,
        getLabelColor({ theme, $linkStyle: $linkStyle as LinkTheme }),
      )};
  }
`;

const Link = ({ children, ...linkProps }: Props): JSX.Element => {
  return <StyledLink {...linkProps}>{children}</StyledLink>;
};

Link.defaultProps = {
  $linkStyle: 'default',
  $bold: false,
  $underline: false,
};

export default Link;
