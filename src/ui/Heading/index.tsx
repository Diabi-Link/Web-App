import React from 'react';
import styled from 'styled-components';

type Props = {
  children: string | React.ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  onClick?: any;
};

// TODO: define default font size and margin for differents levels

const getFontSize = (level: Props['level']): string => {
  switch (level) {
    case 1:
      return '1.875rem';
    case 2:
      return '1.3rem';
    case 3:
      return '1rem';
    case 4:
      return 'auto';
    case 5:
      return 'auto';
    default:
      return 'auto';
  }
};

const getMargin = (level: Props['level']): string => {
  switch (level) {
    case 1:
      return '1.875rem 0';
    case 2:
      return '0.625rem 0';
    case 3:
      return '0.625rem 0';
    case 4:
      return 'auto';
    case 5:
      return 'auto';
    default:
      return 'auto';
  }
};

const StyledHeading = styled.div<{ as: string } & Props>`
  font-size: ${({ level }) => getFontSize(level)};
  margin: ${({ level }) => getMargin(level)};
  font-weight: bolder;
`;

export const Heading = ({
  level,
  children,
  className,
  onClick,
}: Props): JSX.Element => {
  return (
    <StyledHeading
      as={`h${level}` as React.ElementType}
      level={level}
      className={className || ''}
      onClick={onClick}
    >
      {children}
    </StyledHeading>
  );
};

export const PageTitle = styled(Heading)`
  position: relative;
  color: ${({ theme }) => theme.main.primaryLight};
  margin-top: 2rem;
  text-align: center;

  &:before,
  &:after {
    content: '';
    height: 10%;
    top: 50%;
    position: absolute;
  }

  &:before {
    background-color: ${({ theme }) => theme.main.whiteBroken};
    left: -1.5em;
    right: -1.5em;
    z-index: -1;
    height: 101%;
  }

  &:after {
    left: 50%;
    transform: translateX(-50%);
    width: 80vw;
    z-index: -2;
    background-color: ${({ theme }) => theme.main.primaryLight};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

Heading.defaultProps = { className: '' };
