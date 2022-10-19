/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from 'react-icons-kit';
import { ic_close as CloseIcon } from 'react-icons-kit/md/ic_close';
import { Theme } from '../../theme';

import { MainContext } from '../../contexts/MainContext';

export type ButtonTheme = 'green' | 'red' | 'yellow' | undefined;

type GettersArguments = {
  noticeStyle: ButtonTheme;
  theme: Theme;
};

const getBorderColor = ({ noticeStyle, theme }: GettersArguments): string => {
  switch (noticeStyle) {
    case 'green':
      return theme.main.green;
    case 'red':
      return theme.main.red;
    case 'yellow':
      return theme.main.yellow;
    default:
      return 'rgba(255, 255, 255, 0.4)';
  }
};

const getShadowColor = ({ noticeStyle, theme }: GettersArguments): string => {
  switch (noticeStyle) {
    case 'green':
      return theme.main.greenLighter;
    case 'red':
      return theme.main.redLighter;
    case 'yellow':
      return theme.main.yellowLighter;
    default:
      return 'rgba(255, 255, 255, 0.4)';
  }
};

const getBackgroundColor = ({
  noticeStyle,
  theme,
}: GettersArguments): string => {
  switch (noticeStyle) {
    case 'green':
      return theme.main.greenLighter;
    case 'red':
      return theme.main.redLighter;
    case 'yellow':
      return theme.main.yellowLighter;
    default:
      return 'rgba(255, 255, 255, 0.4)';
  }
};

const getColor = ({ noticeStyle, theme }: GettersArguments): string => {
  switch (noticeStyle) {
    case 'green':
      return theme.main.darkGreen;
    case 'red':
      return theme.main.darkRed;
    case 'yellow':
      return theme.main.darkYellow;
    default:
      return theme.main.white;
  }
};

const ButtonElement = styled.button<{
  noticeStyle: ButtonTheme;
  theme: Theme;
  display: Boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  z-index: 99;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ noticeStyle, theme }) =>
    getBackgroundColor({ noticeStyle, theme })};
  color: ${({ noticeStyle, theme }) => getColor({ noticeStyle, theme })};
  box-shadow: ${({ noticeStyle, theme }) =>
    `2px 4px 4px ${getShadowColor({ noticeStyle, theme })}`};
  ${({ display }) =>
    display
      ? css`
          opacity: 1;
          visibility: visible;
          transition: 0.3s;
        `
      : css`
          opacity: 0;
          visibility: hidden;
          transition: 0.3s;
        `}
  @media (orientation: landscape) and (min-width: 768px) {
    flex-direction: row;
  }
`;

const Border = styled.div<{
  noticeStyle: ButtonTheme;
  theme: Theme;
}>`
  left: 0;
  position: absolute;
  border-radius: 10px 0 0 10px;
  height: 100%;
  width: 2%;
  background-color: ${({ noticeStyle, theme }) =>
    getBorderColor({ noticeStyle, theme })};
`;

const IconStart = styled(Icon)`
  margin-bottom: 0.5rem;
  @media (orientation: landscape) and (min-width: 768px) {
    margin-bottom: 0.1rem;
    margin-right: 1rem;
  }
`;

const IconEnd = styled(Icon)<{ closeable?: Boolean }>`
  cursor: ${({ closeable }) => (closeable ? 'pointer' : 'unset')};
  margin-top: 0.5rem;
  @media (orientation: landscape) and (min-width: 768px) {
    margin-top: 0rem;
    margin-left: 0.5rem;
  }
`;

const Notice = (): JSX.Element => {
  const {
    state: {
      noticeData: {
        duration,
        persistent,
        type,
        noticeStyle,
        icon,
        label,
        closeable,
      },
      reset,
    },
  } = useContext(MainContext);
  const [display, setDisplay] = useState(true);

  const closeNotice = () => {
    setDisplay(false);
  };

  useEffect(() => {
    if (!persistent && label !== 'label') {
      const timer = setTimeout(() => {
        closeNotice();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [label]);

  useEffect(() => {
    setDisplay(true);
  }, [reset]);

  return (
    <ButtonElement type={type} display={display} noticeStyle={noticeStyle}>
      <Border noticeStyle={noticeStyle} />
      {icon && <IconStart icon={icon} size={18} />}
      {label}
      <IconEnd
        closeable={closeable}
        icon={CloseIcon}
        onClick={() => closeable && closeNotice()}
        size={22}
      />
    </ButtonElement>
  );
};

export default Notice;
