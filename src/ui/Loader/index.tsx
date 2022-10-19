import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../theme';

type LoaderSyle = 'primary' | 'primaryLight' | 'white' | 'default';

type Props = {
  loaderStyle?: LoaderSyle;
  size?: number;
};

const getColor = ({
  loaderStyle,
  theme,
}: {
  loaderStyle: LoaderSyle;
  theme: Theme;
}): string => {
  switch (loaderStyle) {
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Dots = styled.span<{
  loaderStyle: LoaderSyle;
  size: number;
  position: 0 | 1 | 2;
}>`
  font-size: ${({ size }) => size}rem;
  height: 1em;
  width: 1em;
  border-radius: 1em;
  background-color: ${({ loaderStyle, theme }) =>
    getColor({ theme, loaderStyle })};
  margin-right: ${({ position, size }) => (position !== 2 ? size / 1.3 : 0)}rem;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-name: loading;
  animation-timing-function: ease-in-out;
  animation-delay: ${({ position }) => position * 0.16}s;

  @keyframes loading {
    0%,
    100% {
      opacity: 0.4;
    }

    50% {
      transform: translateY(0.4em);
      opacity: 1;
    }
  }
`;

const Loader = ({
  loaderStyle = 'primary',
  size = 6,
}: Props): React.ReactElement => {
  const convertPxToRem = 0.0625;

  return (
    <Wrapper>
      <Dots
        loaderStyle={loaderStyle}
        size={size * convertPxToRem}
        position={0}
      />
      <Dots
        loaderStyle={loaderStyle}
        size={size * convertPxToRem}
        position={1}
      />
      <Dots
        loaderStyle={loaderStyle}
        size={size * convertPxToRem}
        position={2}
      />
    </Wrapper>
  );
};

export default Loader;
