import React from 'react';
import {
  BubbleContainer,
  BubbleProfile,
  BubbleRole,
  BubbleWrap,
  Column1,
  Column2,
  Heading,
  Img,
  ImgWrap,
  InfoContainer,
  InfoRow,
  InfoWrapper,
  Subtitle,
  TextWrapper,
  TopLine,
} from './InfoElements';
import thibault from '../../../assets/jpegs/Thibault.jpeg';
import laurent from '../../../assets/jpegs/Laurent.jpeg';
import djahid from '../../../assets/pngs/Djahid.png';
import theo from '../../../assets/jpegs/Theo.jpeg';
import nicolas from '../../../assets/jpegs/Nico.jpeg';
import mathis from '../../../assets/jpegs/Mathis.jpeg';

type Props = {
  id: string;
  lightBg: boolean;
  imgStart: boolean;
  topline: string;
  lightText: boolean;
  headline: string;
  darkText: boolean;
  description: string;
  img: string;
  alt: string;
  picture: boolean;
};

const InfoSection = ({
  id,
  lightBg,
  imgStart,
  topline,
  lightText,
  headline,
  darkText,
  description,
  img,
  alt,
  picture,
}: Props) => {
  return (
    <>
      <InfoContainer lightBg={lightBg} id={id}>
        <InfoWrapper>
          <InfoRow imgStart={imgStart}>
            <Column1>
              {picture ? (
                <TextWrapper>
                  <TopLine lightText={lightText}>{topline}</TopLine>
                  <Heading lightText={lightText}>{headline}</Heading>
                  <BubbleContainer>
                    <BubbleWrap
                      href="https://www.linkedin.com/in/nicolas-carrasco-348ab718a/"
                      target="_blank"
                    >
                      <BubbleProfile src={nicolas} alt="nicolas" />
                      <BubbleRole>Développeur Front-end</BubbleRole>
                    </BubbleWrap>
                    <BubbleWrap
                      href="https://www.linkedin.com/in/djahid-bousba/"
                      target="_blank"
                    >
                      <BubbleProfile src={djahid} alt="djahid" />
                      <BubbleRole>Développeur Front-end</BubbleRole>
                    </BubbleWrap>
                    <BubbleWrap
                      href="https://www.linkedin.com/in/mathis-paroissien/"
                      target="_blank"
                    >
                      <BubbleProfile src={mathis} alt="mathis" />
                      <BubbleRole>Développeur Mobile(IOS)</BubbleRole>
                    </BubbleWrap>
                    <BubbleWrap
                      href="https://www.linkedin.com/in/theo-henault-859b61178/"
                      target="_blank"
                    >
                      <BubbleProfile src={theo} alt="theo" />
                      <BubbleRole>Développeur Back-end</BubbleRole>
                    </BubbleWrap>
                    <BubbleWrap
                      href="https://www.linkedin.com/in/thibault-schmitt/"
                      target="_blank"
                    >
                      <BubbleProfile src={thibault} alt="thibault" />
                      <BubbleRole>Développeur Back-end</BubbleRole>
                    </BubbleWrap>
                    <BubbleWrap
                      href="https://www.linkedin.com/in/laurent-sferlazza-630654179/"
                      target="_blank"
                    >
                      <BubbleProfile src={laurent} alt="laurent" />
                      <BubbleRole>Développeur Mobile(Android)</BubbleRole>
                    </BubbleWrap>
                  </BubbleContainer>
                </TextWrapper>
              ) : (
                <TextWrapper>
                  <TopLine lightText={lightText}>{topline}</TopLine>
                  <Heading lightText={lightText}>{headline}</Heading>
                  <Subtitle darkText={darkText}>{description}</Subtitle>
                </TextWrapper>
              )}
              {/* <BtnWrap>
                                <Button
                                    to='home'
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    offset={-80}
                                    primary={primary ? true : false}
                                    dark={dark ? true : false}
                                >
                                    {buttonLabel}
                                </Button>
                            </BtnWrap> */}
            </Column1>
            <Column2>
              <ImgWrap />
              <Img src={img} alt={alt} />
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
