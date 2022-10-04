import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import SolutionImg from '../../../../assets/pngs/Solution.png';

import { Heading } from '../../../../ui/Heading';

const Solution = () => {
  const { t } = useTranslation();

  return (
    <SolutionContainer id="solution">
      <DescriptionWrapper>
        <Title level={1}>{t('Solution.Title')}</Title>
        <Content level={3}>{t('Solution.Desc1')}</Content>
        <Content level={3}>{t('Solution.Desc2')}</Content>
        <Content level={3}>{t('Solution.Desc3')}</Content>
      </DescriptionWrapper>
      <ImgWrapper>
        <img src={SolutionImg} alt="Solution" />
      </ImgWrapper>
    </SolutionContainer>
  );
};

const SolutionContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: justify;
  background: ${({ theme }) => theme.main.whiteBroken};
  position: relative;
  padding: 5rem;

  @media (orientation: portrait) and (max-width: 900px) {
    flex-direction: column;
    padding: 2rem;
    align-items: center;
  }
`;

const DescriptionWrapper = styled.div`
  color: ${({ theme }) => theme.main.primary};
  width: 70vw;
  margin-right: 8rem;

  & > h3 {
    margin: 1rem 0;
  }

  @media (orientation: portrait) and (max-width: 900px) {
    width: auto;
    margin-right: 0;
  }
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;

  & > img {
    height: 15rem;
  }

  @media (min-width: 900px) {
    width: 27vw;

    & > img {
      height: 20rem;
    }
  }

  @media (min-width: 1200px) {
    & > img {
      height: 25rem;
    }
  }
`;

const Title = styled(Heading)`
  position: relative;

  &:before {
    content: '';
    height: 2.5px;
    width: 8rem;
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.main.primaryLight};
  }
  font-size: 1.5rem;
  margin-bottom: 6rem;
  text-align: center;

  @media (min-width: 1200px) {
    font-size: 2.5rem;
    text-align: left;
    &:before {
      left: 33%;
    }
  }
`;

const Content = styled(Heading)`
  font-weight: 500;
  font-size: 1rem;

  @media (min-width: 600px) {
    font-weight: 600;
  }
`;

export default Solution;
