import React from 'react';
import LanguageSwitcher from '../../../ui/LanguageSwitcher';
import Footer from '../Footer';
import HeroSection from '../HeroSection';
import InfoSection from '../InfoSection';
import { homeObjOne, homeObjTwo } from '../InfoSection/Data';
import Services from '../Services';
import Timeline from '../Timeline';

const Home = (): JSX.Element => {
  return (
    <div data-testid="static-home-page">
      <HeroSection />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <Services />
      <Timeline />
      <Footer />
      <LanguageSwitcher />
    </div>
  );
};

export default Home;
