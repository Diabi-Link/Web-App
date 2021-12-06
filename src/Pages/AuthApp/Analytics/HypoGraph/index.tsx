import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ResponsiveContainer, BarChart, XAxis, LabelList, Bar } from 'recharts';

import Button from '../../../../ui/Button';

const data = [
  {
    name: '00:00',
    hypo: 1,
  },
  {
    name: '06:00',
    hypo: 2,
  },
  {
    name: '12:00',
    hypo: 0,
  },
  {
    name: '18:00',
    hypo: 3,
  },
  {
    name: '23:59',
    hypo: 1,
  },
];

const HypoGraph = () => {
  const { t } = useTranslation();

  const activeButton = [true, false, false];
  const [isActive, setIsActive] = useState<boolean[]>(activeButton);
  const handleClick = (id: number): void => {
    setIsActive(isActive.map((active, key) => key === id));
  };

  return (
    <Container>
      <TitleWrapper>
        <GraphTitle>{t('Analytics.Low')}</GraphTitle>
      </TitleWrapper>
      <GraphWrapper>
        <ResponsiveContainer height={180}>
          <BarChart
            data={data}
            margin={{
              top: 30,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="name"
              padding="gap"
              tickLine={false}
              strokeWidth="0.4"
              dy={10}
            />
            <Bar
              dataKey="hypo"
              animationDuration={1000}
              fill="#FF5F5F"
              radius={15}
              barSize={20}
              stroke="black"
              strokeWidth="0.4"
            >
              <LabelList
                dataKey="hypo"
                position="top"
                fontWeight={700}
                fontSize={15}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </GraphWrapper>
      <ButtonsWrapper>
        <DataButton
          type="submit"
          label={t('Analytics.7')}
          btnStyle="primary"
          shadow
          isActive={isActive[0]}
          onClick={() => handleClick(0)}
          // disabled={loading}
        />
        <DataButton
          type="submit"
          label={t('Analytics.14')}
          btnStyle="primary"
          shadow
          isActive={isActive[1]}
          onClick={() => handleClick(1)}
          // disabled={loading}
        />
        <DataButton
          type="submit"
          label={t('Analytics.30')}
          btnStyle="primary"
          shadow
          isActive={isActive[2]}
          onClick={() => handleClick(2)}
          // disabled={loading}
        />
      </ButtonsWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.main.blueLight};
  border-radius: 15px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  width: 92vw;
  height: 350px;

  @media (min-width: 768px) and (orientation: portrait) {
    width: 60vw;
  }

  @media (min-width: 768px) and (orientation: landscape) {
    width: 50%;
    height: auto;
  }

  @media (min-width: 1024px) and (orientation: landscape) {
    width: 35%;
    height: auto;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
`;

const GraphWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const GraphTitle = styled.label`
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: black;
  margin-top: 20px;
`;

const DataButton = styled(Button)<{
  isActive: boolean;
}>`
  margin: 1.5rem 0.5rem;
  background-color: ${({ isActive }) => (isActive ? 'white' : 0)};
  color: ${({ isActive }) => (isActive ? 'black' : 0)};
  &:hover:not(:disabled) {
    background-color: ${({ isActive }) => (isActive ? 'white' : 0)};
  }
`;

export default HypoGraph;
