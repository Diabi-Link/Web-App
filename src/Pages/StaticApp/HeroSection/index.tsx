import React from 'react';
import Video from '../../../assets/mp4/video.mp4';
import { HeroBg, HeroContainer, VideoBg } from './HeroElements';

const HeroSection = () => {
  // const [hover, setHover] = useState(false)
  // const onHover = () => setHover(!hover)

  return (
    <HeroContainer>
      <HeroBg>
        <VideoBg
          playsInline
          autoPlay
          loop
          muted
          src={Video}
          typeof="video/mp4"
        />
      </HeroBg>
      {/* <HeroContent>
          <HeroP>
          Notre application web et mobile vous permettra de suivre et d'aider les personnes diabétiques ayant des difficultés à gérer cette maladie de façon autonome.
          </HeroP>
          <HeroBtnWrapper>
            <Button to='signup' onMouseEnter={onHover} onMouseLeave={onHover} primary dark>
              Get Started {hover ? </> : <ArrowRight/> }
            </Button>
          </HeroBtnWrapper>
        </HeroContent> */}
    </HeroContainer>
  );
};

export default HeroSection;
