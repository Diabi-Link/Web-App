import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { animateScroll as scroll } from 'react-scroll';
import {
  FooterContainer,
  FooterWrap,
  SocialIconLink,
  SocialIcons,
  SocialLogo,
  SocialMedia,
  SocialMediaWrap,
  WebsiteRights,
} from './FooterElements';

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer>
      <FooterWrap>
        {/* <FooterLinksContainer>
                <FooterLinksWrapper>
                    <FooterLinkItems>
                            <FooterLinkTitle>About us</FooterLinkTitle>
                            <FooterLink to="/signin">How it works</FooterLink>
                            <FooterLink to="/signin">Testimonials</FooterLink>
                            <FooterLink to="/signin">Inverstors</FooterLink>
                            <FooterLink to="/signin">Terms of Services</FooterLink>
                    </FooterLinkItems>
                    <FooterLinkItems>
                            <FooterLinkTitle>About us</FooterLinkTitle>
                            <FooterLink to="/signin">How it works</FooterLink>
                            <FooterLink to="/signin">Testimonials</FooterLink>
                            <FooterLink to="/signin">Inverstors</FooterLink>
                            <FooterLink to="/signin">Terms of Services</FooterLink>
                    </FooterLinkItems>
                </FooterLinksWrapper>
                <FooterLinksWrapper>
                    <FooterLinkItems>
                            <FooterLinkTitle>About us</FooterLinkTitle>
                            <FooterLink to="/signin">How it works</FooterLink>
                            <FooterLink to="/signin">Testimonials</FooterLink>
                            <FooterLink to="/signin">Inverstors</FooterLink>
                            <FooterLink to="/signin">Terms of Services</FooterLink>
                    </FooterLinkItems>
                    <FooterLinkItems>
                            <FooterLinkTitle>About us</FooterLinkTitle>
                            <FooterLink to="/signin">How it works</FooterLink>
                            <FooterLink to="/signin">Testimonials</FooterLink>
                            <FooterLink to="/signin">Inverstors</FooterLink>
                            <FooterLink to="/signin">Terms of Services</FooterLink>
                    </FooterLinkItems>
                </FooterLinksWrapper>
            </FooterLinksContainer> */}
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/" onClick={toggleHome}>
              DiabiLink
            </SocialLogo>
            <WebsiteRights>
              diabilink © {new Date().getFullYear()} Tous droits réservés.
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLink onClick={toggleHome} arial-label="Facebook">
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink
                onClick={toggleHome}
                target="_blank"
                arial-label="Instagram"
              >
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink onClick={toggleHome} arial-label="Twitter">
                <FaTwitter />
              </SocialIconLink>
              <SocialIconLink onClick={toggleHome} arial-label="LinkedIn">
                <FaLinkedin />
              </SocialIconLink>
              <SocialIconLink
                href="mailto:diabilinkmrs@gmail.com"
                arial-label="Gmail"
              >
                <SiGmail />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
