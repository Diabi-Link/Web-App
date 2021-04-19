import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 4.2rem;
  background-color: ${(props) => props.theme.main.white};
  box-shadow: 0 0.32rem 0.938rem rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
`;

const SiteNavWrapper = styled.div`
  margin-left: 12.5rem;
  display: flex;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
  height: 3.4rem;
  width: auto;
  margin-right: 0.625rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 650;
  color: ${(props) => props.theme.main.primary};
`;

const Navbar = (): JSX.Element => {
  return (
    <Container>
      <SiteNavWrapper>
        <LogoWrapper>
          <StyledLogo />
          <Title>Diabi&apos;Link</Title>
        </LogoWrapper>
      </SiteNavWrapper>
    </Container>
  );
};

export default Navbar;
