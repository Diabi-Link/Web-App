import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { animateScroll as scroll, Link } from 'react-scroll';

import { Icon } from 'react-icons-kit';
import { facebook } from 'react-icons-kit/icomoon/facebook';
import { twitter } from 'react-icons-kit/icomoon/twitter';
import { linkedin2 } from 'react-icons-kit/icomoon/linkedin2';
import { ic_mail as mail } from 'react-icons-kit/md/ic_mail';

import DiabiLink from '../../../../assets/svgs/DiabiLink.svg';

import { Heading } from '../../../../ui/Heading';

const Footer = () => {
  const { t } = useTranslation();

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer>
      <FooterWrapper>
        <LogoWrapper>
          <Img onClick={toggleHome} src={DiabiLink} alt="logo" />
          <Content level={2}>{t('Footer.Rights')}</Content>
        </LogoWrapper>
        <LinkWrapper>
          <LinkTitle level={2}>{t('Footer.Links')}</LinkTitle>
          <NavLink to="solution" smooth duration={500} spy offset={-150}>
            {t('Navbar.Solution')}
          </NavLink>
          <NavLink to="services" smooth duration={500} spy offset={-150}>
            {t('Navbar.Services')}
          </NavLink>
          <NavLink to="faq" smooth duration={500} spy offset={-150}>
            {t('Navbar.FAQ')}
          </NavLink>
          <NavLink to="team" smooth duration={500} spy offset={-90}>
            {t('Navbar.Team')}
          </NavLink>
          <NavLink to="timeline" smooth duration={500} spy offset={-80}>
            {t('Navbar.Timeline')}
          </NavLink>
          <NavLink to="contact" smooth duration={500} spy offset={0}>
            {t('Navbar.Contact')}
          </NavLink>
        </LinkWrapper>
        <MediaWrapper>
          <MediaBox>
            <Icon icon={linkedin2} size={20} />
          </MediaBox>
          <MediaBox>
            <Icon icon={twitter} size={20} />
          </MediaBox>
          <MediaBox>
            <Icon icon={facebook} size={20} />
          </MediaBox>
          <MediaBox>
            <MediaLink href="mailto:diabilinkmrs@gmail.com">
              <Icon icon={mail} size={20} />
            </MediaLink>
          </MediaBox>
        </MediaWrapper>
      </FooterWrapper>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.main.primary};
  border-top: 2px solid white;
  padding: 2rem 0;
  color: white;
`;

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80vw;

  @media (max-width: 600px) {
    flex-direction: column;

    & > div {
      text-align: center;
      justify-content: center;
      margin: 1rem 0;
      width: 100%;
    }
  }
`;

const LogoWrapper = styled.div`
  width: 50%;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`;

const MediaWrapper = styled.div`
  display: flex;
  width: 25%;

  & > div {
    margin: 0 0.5rem;
  }
`;

const Img = styled.img`
  max-width: 15%;
  justify-self: flex-start;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 0 0px 0;
  padding-right: 0;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Content = styled(Heading)`
  font-size: 0.8rem;
  font-weight: 600;
  margin: 1rem 0;
`;

const LinkTitle = styled(Heading)`
  font-size: 0.8rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
`;

const NavLink = styled(Link)`
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.2rem 0;
  cursor: pointer;
`;

const MediaBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: ${({ theme }) => theme.main.primary};
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
`;

const MediaLink = styled.a`
  color: ${({ theme }) => theme.main.primary};
`;

export default Footer;
