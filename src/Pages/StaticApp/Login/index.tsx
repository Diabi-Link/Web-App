import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-icons-kit';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';

import { ReactComponent as LoginSvg } from '../../../assets/svgs/Login.svg';
import { ReactComponent as LogoText } from '../../../assets/svgs/DiabiLinkDark.svg';

import Form from './Form';

const Container = styled.div`
  display: flex;
  max-height: 100vh;
  max-width: 100vw;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;

  @media (orientation: landscape),
    (min-width: 769px) and (orientation: landscape) {
    width: 55vw;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45vw;
  height: 100vh;
  background-color: ${(props) => props.theme.main.primaryLighter};

  & > svg {
    margin: 30px 0px;
  }

  @media (orientation: portrait), (max-width: 768px) {
    display: none;
  }
`;

const ConnexionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
`;

const BackWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 30px 50px;

  @media (min-width: 768px) {
    padding: 30px 100px;
  }
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const ArrowBack = styled(Icon)`
  color: ${({ theme }) => theme.main.primary};
`;

const Description = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.875rem;
  font-weight: 700;
  margin: 30px 10px;
  color: ${(props) => props.theme.main.darkBlue};
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  padding: 0px 10px;
  color: ${(props) => props.theme.main.primary};
`;

const SvgWrapper = styled.div`
  margin: 2.5rem 0;

  @media (min-width: 1500px) {
    margin: 3.5rem;
  }
`;

const LogoWrapper = styled.div`
  margin-top: 7rem;

  @media (min-width: 1500px) {
    margin-top: 10rem;
  }
`;

const Login = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Container>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <button onClick={beakrWorld} type="button">
        Break world
      </button>
      <Left>
        <BackWrapper>
          <BackLink to="/">
            <ArrowBack icon={arrowLeft2} size={20} />
            <Text>{t('Link.BackSite')}</Text>
          </BackLink>
        </BackWrapper>
        <ConnexionWrapper>
          <Form />
        </ConnexionWrapper>
      </Left>
      <Right>
        <LogoWrapper>
          <LogoText />
        </LogoWrapper>
        <SvgWrapper>
          <LoginSvg />
        </SvgWrapper>
        <Description>{t('Login.FrameDesc')}</Description>
      </Right>
    </Container>
  );
};

export default Login;
