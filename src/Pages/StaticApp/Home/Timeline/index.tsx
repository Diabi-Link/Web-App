import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Icon } from 'react-icons-kit';
import { ic_filter_tilt_shift as Circle } from 'react-icons-kit/md/ic_filter_tilt_shift';

import { Heading } from '../../../../ui/Heading';

const Timeline = () => {
  const { t } = useTranslation();

  const TimelineSelector = [
    {
      month: t('Timeline.September'),
      desc: t('Timeline.Creation'),
    },
    {
      month: t('Timeline.Feb'),
      desc: t('Timeline.Market'),
    },
    {
      month: t('Timeline.March'),
      desc: t('Timeline.Dev'),
    },
    {
      month: t('Timeline.May'),
      desc: t('Timeline.Beta'),
    },
    {
      month: t('Timeline.Sept2022'),
      desc: t('Timeline.AppGrowth'),
    },
    {
      month: t('Timeline.January'),
      desc: t('Timeline.AppDelivery'),
    },
  ];

  return (
    <TimelineContainer id="timeline">
      <TimelineWrapper>
        <Title level={1}>{t('Timeline.Title')}</Title>
        {TimelineSelector.map(({ month, desc }, idx) => (
          <TimelineBox>
            <TimelineDetail>
              <Content align="right" level={3}>
                {month}
              </Content>
              <Icon icon={Circle} size={20} />
              <Content align="left" level={3}>
                {desc}
              </Content>
            </TimelineDetail>

            {idx !== TimelineSelector.length - 1 && <Separator />}
          </TimelineBox>
        ))}
      </TimelineWrapper>
    </TimelineContainer>
  );
};

const TimelineContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${({ theme }) => theme.main.whiteBroken};
  position: relative;
  padding: 2rem;

  @media (orientation: portrait) and (max-width: 600px) {
    padding: 2rem 1rem;
  }
`;

const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  color: ${({ theme }) => theme.main.primary};
`;

const TimelineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const TimelineDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Separator = styled.div`
  width: 2px;
  height: 4rem;
  background-color: ${({ theme }) => theme.main.primaryLight};
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
  }
`;

const Content = styled(Heading)<{ align: string }>`
  width: 40%;
  text-align: ${({ align }) => align};
  font-weight: 600;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

export default Timeline;
