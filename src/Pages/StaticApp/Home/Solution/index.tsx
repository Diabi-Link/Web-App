import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import SolutionImg from '../../../../assets/pngs/Solution.png';

import Heading from '../../../../ui/Heading';

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
  width: 30vw;

  & > img {
    width: 30rem;
  }

  @media (orientation: portrait) and (max-width: 900px) {
    padding: 2rem 0;
    width: auto;

    & > img {
      width: 25rem;
    }
  }

  @media (orientation: portrait) and (max-width: 600px) {
    & > img {
      width: 20rem;
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
    left: 45%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.main.primaryLight};
  }
  font-size: 2.2rem;
  margin-bottom: 6rem;
`;

const Content = styled(Heading)`
  font-weight: 600;
  font-size: 1rem;
`;

export default Solution;
