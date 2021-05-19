import React from 'react';
import styled from 'styled-components';

import { ReactComponent as ForgotPasswordSvg } from '../../../assets/images/ForgotPassword.svg';
import { ReactComponent as ResetPasswordSvg } from '../../../assets/images/ResetPassword.svg';
import { ReactComponent as LogoText } from '../../../assets/images/DiabiLink.svg';

type Props = {
  step: number;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SvgWrapper = styled.div`
  margin: 5rem 0;

  @media (min-width: 1500px) {
    margin: 7rem;
  }
`;

const LogoWrapper = styled.div`
  margin-top: 7rem;

  @media (min-width: 1500px) {
    margin-top: 10rem;
  }
`;

const FrameSide = ({ step }: Props): JSX.Element => {
  return (
    <Container>
      <LogoWrapper>
        <LogoText />
      </LogoWrapper>
      <SvgWrapper>
        {step === 1 ? <ForgotPasswordSvg /> : <ResetPasswordSvg />}
      </SvgWrapper>
    </Container>
  );
};

export default FrameSide;
