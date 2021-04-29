import React from 'react';
import styled from 'styled-components';

type Props = {
  children: string | React.ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

const StyledHeading = styled.div<{ as: string } & Props>``;

const Heading = ({ level, children, className }: Props): JSX.Element => {
  return (
    <StyledHeading
      as={`h${level}` as React.ElementType}
      level={level}
      className={className || ''}
    >
      {children}
    </StyledHeading>
  );
};

Heading.defaultProps = { className: '' };

export default Heading;
