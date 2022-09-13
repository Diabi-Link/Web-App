import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Icon } from 'react-icons-kit';
import {
  ic_expand_less as ExpandLess,
  ic_expand_more as ExpandMore,
} from 'react-icons-kit/md';

import { Heading } from '../../../../ui/Heading';

const FAQ = () => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState<Boolean[]>([false, false, false]);

  const FAQSelector = [
    {
      Q: t('FAQ.Q1'),
      A: t('FAQ.A1'),
    },
    {
      Q: t('FAQ.Q2'),
      A: t('FAQ.A2'),
    },
    {
      Q: t('FAQ.Q3'),
      A: t('FAQ.A3'),
    },
  ];

  return (
    <FAQContainer id="faq">
      <FAQWrapper>
        <Title level={1}>{t('FAQ.Title')}</Title>
        <Subtitle level={5}>{t('FAQ.Subtitle')}</Subtitle>
        {FAQSelector.map(({ Q, A }, index) => (
          <FAQBox>
            <QuestionBox>
              <Question level={2}>{Q}</Question>
              <Button
                onClick={() =>
                  setIsActive(
                    isActive.map((active, idx) =>
                      idx === index ? !active : active,
                    ),
                  )
                }
              >
                <Icon
                  icon={isActive[index] ? ExpandMore : ExpandLess}
                  size={40}
                />
              </Button>
            </QuestionBox>
            {isActive[index] && <Content level={3}>{A}</Content>}
          </FAQBox>
        ))}
      </FAQWrapper>
    </FAQContainer>
  );
};

const FAQContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${({ theme }) => theme.main.whiteBroken};
  position: relative;
  padding: 5rem;

  @media (max-width: 1200px) {
    padding: 3rem 1rem;
  }

  @media (orientation: portrait) and (max-width: 600px) {
    padding: 3rem 1rem;
  }
`;

const FAQWrapper = styled.div`
  color: ${({ theme }) => theme.main.primary};
  width: 55vw;

  @media (max-width: 1200px) {
    width: 80vw;
  }

  @media (orientation: portrait) and (max-width: 600px) {
    width: 90vw;
  }
`;

const FAQBox = styled.div`
  :not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.main.primaryLight};
  }
`;

const QuestionBox = styled.div`
  display: flex;
  justify-content: space-between;
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
  font-size: 2.2rem;
`;

const Subtitle = styled(Heading)`
  font-weight: 600;
  font-size: 0.7rem;
  margin: 4rem 0;
`;

const Question = styled(Heading)`
  margin: 1.5rem 0;

  @media (orientation: portrait) and (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const Content = styled(Heading)`
  text-align: left;
  font-weight: 500;
  font-size: 1rem;
`;

const Button = styled.button`
  color: ${({ theme }) => theme.main.primary};
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

export default FAQ;
