import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  BarChart,
  YAxis,
  LabelList,
  Bar,
  Text,
  XAxis,
  Cell,
} from 'recharts';

import Button from '../../../../ui/Button';

const data = [
  {
    name: '> 240',
    percentage: 36,
  },
  {
    name: '181 - 240',
    percentage: 23,
  },
  {
    name: '70 - 180',
    percentage: 40,
  },
  {
    name: '< 70',
    percentage: 1,
  },
];

const data2 = [
  {
    name: '>240',
    percentage: 16,
  },
  {
    name: '181 - 240',
    percentage: 54,
  },
  {
    name: '70 - 180',
    percentage: 25,
  },
  {
    name: '<70',
    percentage: 5,
  },
];

const data3 = [
  {
    name: '>240',
    percentage: 6,
  },
  {
    name: '181 - 240',
    percentage: 40,
  },
  {
    name: '70 - 180',
    percentage: 44,
  },
  {
    name: '<70',
    percentage: 10,
  },
];

let ctx: CanvasRenderingContext2D | null;

export const measureTextSize = ({
  text,
  size,
  fontFamily,
}: {
  text: string;
  size: number;
  fontFamily: string;
}) => {
  if (!ctx) {
    ctx = document.createElement('canvas').getContext('2d');
    if (ctx) {
      ctx.font = `${size}px '${fontFamily}`;
    }
  }

  return ctx ? ctx.measureText(text).width : 0;
};

const YAxisLeftTick = ({
  y,
  payload: { value },
}: {
  y: number;
  payload: { value: string };
}) => {
  return (
    <Text
      x={90}
      y={y}
      textAnchor="end"
      verticalAnchor="end"
      style={{ fontWeight: 500 }}
    >
      {value}
    </Text>
  );
};

const TimeInTargetGraph = () => {
  const { t } = useTranslation();

  const activeButton = [true, false, false];
  const [isActive, setIsActive] = useState<boolean[]>(activeButton);
  const [dataChoosen, setDataChoosen] = useState<
    {
      name: string;
      percentage: number;
    }[]
  >(data);

  const handleClick = (id: number): void => {
    let newData: { name: string; percentage: number }[];

    if (id === 0) {
      newData = data;
    } else if (id === 1) {
      newData = data2;
    } else {
      newData = data3;
    }
    setIsActive(isActive.map((active, key) => key === id));
    setDataChoosen(newData);
  };

  const maxTextWidth = useMemo(
    () =>
      data.reduce((acc, cur) => {
        const value = cur.percentage;
        const width = measureTextSize({
          text: value.toLocaleString(),
          size: 16,
          fontFamily: 'Montserrat',
        });
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    [],
  );

  return (
    <Container>
      <TitleWrapper>
        <GraphTitle>{t('Analytics.TimeInTarget')}</GraphTitle>
      </TitleWrapper>
      <GraphWrapper>
        <ResponsiveContainer height={140}>
          <BarChart
            data={dataChoosen}
            margin={{
              top: 20,
              left: maxTextWidth + 30,
              right:
                20 +
                measureTextSize({
                  text: '100%',
                  size: 15,
                  fontFamily: 'Montserrat',
                }),
            }}
            layout="vertical"
          >
            <XAxis hide axisLine={false} type="number" domain={[0, 100]} />
            <YAxis
              yAxisId={0}
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={YAxisLeftTick}
            />
            <Bar
              dataKey="percentage"
              minPointSize={2}
              animationDuration={1000}
              radius={10}
              barSize={20}
              stroke="black"
              strokeWidth="0.4"
            >
              {data.map((d) => {
                return <Cell key={d.name} fill="#FF5F5F" />;
              })}
              <LabelList
                dataKey="percentage"
                position="right"
                fontWeight={700}
                fontSize={15}
                formatter={(label: string) => `${label}%`}
                fill="#111"
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

export default TimeInTargetGraph;
