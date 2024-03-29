import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { ReactComponent as AccountSvg } from '../../../../assets/svgs/AccountForm.svg';
import { ReactComponent as UserSvg } from '../../../../assets/svgs/UserForm.svg';
import { ReactComponent as SecuritySvg } from '../../../../assets/svgs/SecurityForm.svg';
import { ReactComponent as MailSvg } from '../../../../assets/svgs/Mail.svg';
import { ReactComponent as LogoText } from '../../../../assets/svgs/DiabiLinkDark.svg';

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
  margin: 30px 80px;
  color: ${(props) => props.theme.main.darkBlue};

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
  const { t } = useTranslation();
  const frames = [
    {
      svg: <UserSvg />,
      description: t('Register.Frames.User'),
    },
    {
      svg: <AccountSvg />,
      description: t('Register.Frames.Account'),
    },
    {
      svg: <SecuritySvg />,
      description: t('Register.Frames.Security'),
    },
    {
      svg: <MailSvg />,
      description: t('Register.Frames.Mail'),
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
