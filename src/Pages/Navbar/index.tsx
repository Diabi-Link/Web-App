import React from 'react';
import styled from 'styled-components';
import { Link as LinkRouter, withRouter } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import Button from '../../ui/Button';

const Container = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 3.8rem;
  background-color: ${(props) => props.theme.main.white};
  box-shadow: 0 0.32rem 0.938rem rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.875rem;
  z-index: 1000;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 68rem;
`;

const SiteNavWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.25rem;
`;

const StyledLogo = styled(Logo)`
  height: 2.3rem;
  width: auto;
  margin-right: 0.625rem;
`;

const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${(props) => props.theme.main.primary};
`;

const Divider = styled.div`
  width: 0.0625rem;
  height: 1.5rem;
  background-color: ${(props) => props.theme.main.grayLight};
  margin-right: 1.25rem;
`;

const Link = styled(LinkRouter)<{ to: string; pathname: string }>`
  text-decoration: none;
  font-weight: 500;
  margin-right: 1.25rem;
  color: ${(props) =>
    props.to === props.pathname
      ? props.theme.main.dark
      : props.theme.main.grayDark};
`;

const ConnexionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LoginButton = styled(Button)`
  margin-right: 1.25rem;
`;

type Props = {
  location: {
    pathname: string;
  };
};

const Navbar = ({ location }: Props): JSX.Element => {
  return (
    <Container>
      <Wrapper>
        <SiteNavWrapper>
          <LogoWrapper>
            <StyledLogo />
            <Title>Diabilink</Title>
          </LogoWrapper>
          <Divider />
          <Link to="/" pathname={location.pathname}>
            Accueil
          </Link>
        </SiteNavWrapper>
        <ConnexionWrapper>
          <LoginButton label="Se connecter" btnStyle="primary" outlined />
          <LinkRouter to="/register/user">
            <Button label="S'inscrire" btnStyle="primary" />
          </LinkRouter>
        </ConnexionWrapper>
      </Wrapper>
    </Container>
  );
};

export default withRouter(Navbar);
