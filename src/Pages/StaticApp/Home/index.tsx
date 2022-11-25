import React from 'react';
import styled from 'styled-components';

import LanguageSwitcher from '../../../ui/LanguageSwitcher';
import Footer from './Footer';
import Hero from './Hero';
import Solution from './Solution';
import Services from './Services';
import Pricing from './Pricing';
import FAQ from './FAQ';
import Team from './Team';
import Timeline from './Timeline';
import ContactUs from './ContactUs';

const Home = (): JSX.Element => {
  return (
    <Container data-testid="static-home-page">
      <Hero />
      <Solution />
      <Services />
      <Pricing />
      <FAQ />
      <Team />
      <Timeline />
      <ContactUs />
      <Footer />
      <LanguageSwitcher />
    </Container>
  );
};

const Container = styled.div`
  background: ${({ theme }) => theme.main.primary};
`;

export default Home;
