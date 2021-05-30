import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

import { ReactComponent as Logo } from '../../../assets/images/AppLogo.svg';
import { ReactComponent as LogoText } from '../../../assets/images/DiabiLink.svg';
import Button from '../../../ui/Button';

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

const LogoWrapper = styled(Link)<{ to: string; pathname: string }>`
  display: flex;
  align-items: center;
  margin-right: 1.25rem;
`;

const StyledLogo = styled(Logo)`
  height: 2.3rem;
  width: auto;
  margin-right: 0.625rem;
`;

const StyledLogoText = styled(LogoText)`
  height: 1.35rem;
  width: auto;
`;

const Divider = styled.div`
  width: 0.0625rem;
  height: 1.5rem;
  background-color: ${(props) => props.theme.main.grayLight};
  margin-right: 1.25rem;
`;

const NavLink = styled(Link)<{ to: string; pathname: string }>`
  text-decoration: none;
  font-weight: 500;
  margin-right: 1.25rem;
  color: ${(props) =>
    props.to === props.pathname
      ? props.theme.main.dark
      : props.theme.main.grayDark};
`;

const AuthLink = styled(Link)<{ to: string }>`
  text-decoration: none;
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
          <LogoWrapper to="/" pathname={location.pathname}>
            <StyledLogo />
            <StyledLogoText />
          </LogoWrapper>
          <Divider />
          <NavLink to="/" pathname={location.pathname}>
            Accueil
          </NavLink>
        </SiteNavWrapper>
        <ConnexionWrapper>
          <AuthLink to="/login">
            <LoginButton label="Se connecter" btnStyle="primary" outlined />
          </AuthLink>
          <AuthLink to="/register/user">
            <Button label="S'inscrire" btnStyle="primary" />
          </AuthLink>
        </ConnexionWrapper>
      </Wrapper>
    </Container>
  );
};

export default withRouter(Navbar);
