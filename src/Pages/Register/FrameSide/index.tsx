import React from 'react';
import styled from 'styled-components';

import { ReactComponent as AccountSvg } from '../../../assets/images/AccountForm.svg';
import { ReactComponent as UserSvg } from '../../../assets/images/UserForm.svg';
import { ReactComponent as SecuritySvg } from '../../../assets/images/SecurityForm.svg';
import { ReactComponent as MailSvg } from '../../../assets/images/Mail.svg';
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
  margin: 3rem 0;

  @media (min-width: 1500px) {
    margin: 5.5rem;
  }
`;

const Description = styled.p`
  display: flex;
  text-align: center;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 30px 50px;
  color: ${(props) => props.theme.main.white};

  @media (min-width: 1500px) {
    font-size: 1.55rem;
  }
`;

const LogoWrapper = styled(LogoText)`
  margin-top: 7rem;

  @media (min-width: 1500px) {
    margin-top: 9rem;
  }
`;

const FrameSide = ({ step }: Props): JSX.Element => {
  const frames = [
    {
      svg: <UserSvg />,
      description: "Nous avons besoin d'en apprendre un peu plus sur vous...",
    },
    {
      svg: <AccountSvg />,
      description: 'Une interface adaptée à vos bexsoins.',
    },
    {
      svg: <SecuritySvg />,
      description: "Plus qu'une étape pour rejoindre notre grande famille.",
    },
    {
      svg: <MailSvg />,
      description: 'C’est le début d’une grande aventure entre nous 🎉.',
    },
  ];

  return (
    <Container>
      <LogoWrapper />
      <SvgWrapper>{frames[step - 1].svg}</SvgWrapper>
      <Description>{frames[step - 1].description}</Description>
    </Container>
  );
};

export default FrameSide;
