import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  LineChart,
  YAxis,
  XAxis,
  Line,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
} from 'recharts';
import { format } from 'date-fns';

const data = [
  {
    time: new Date('July 4 2021 00:00').getTime(),
    val: 140,
  },
  {
    time: new Date('July 4 2021 04:53').getTime(),
    val: 70,
  },
  {
    time: new Date('July 4 2021 05:10').getTime(),
    val: 40,
  },
  {
    time: new Date('July 4 2021 09:20').getTime(),
    val: 170,
  },
  {
    time: new Date('July 4 2021 14:30').getTime(),
    val: 200,
  },
  {
    time: new Date('July 4 2021 17:00').getTime(),
    val: 86,
  },
  {
    time: new Date('July 4 2021 18:42').getTime(),
    val: 57,
  },
  {
    time: new Date('July 4 2021 22:09').getTime(),
    val: 145,
  },
  {
    time: new Date('July 4 2021 23:50').getTime(),
    val: 78,
  },
];

const DailyGraph = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <TitleWrapper>
        <GraphTitle>{t('Analytics.Daily')}</GraphTitle>
      </TitleWrapper>
      <GraphWrapper>
        <ResponsiveContainer height={350}>
          <LineChart
            data={data}
            margin={{
              top: 30,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            layout="horizontal"
          >
            <ReferenceArea
              x1={new Date('July 4 2021 00:00').getTime()}
              x2={new Date('July 5 2021 00:00').getTime()}
              y1={70}
              y2={170}
              strokeOpacity={0}
              fill="rgb(255, 255, 255)"
            />
            <CartesianGrid vertical={false} stroke="#B4B4B4" strokeWidth={1} />
            <XAxis
              dataKey="time"
              domain={[
                new Date('July 4 2021 00:00').getTime(),
                new Date('July 5 2021 00:00').getTime(),
              ]}
              ticks={[
                new Date('July 4 2021 00:00').getTime(),
                new Date('July 4 2021 03:00').getTime(),
                new Date('July 4 2021 06:00').getTime(),
                new Date('July 4 2021 09:00').getTime(),
                new Date('July 4 2021 12:00').getTime(),
                new Date('July 4 2021 15:00').getTime(),
                new Date('July 4 2021 18:00').getTime(),
                new Date('July 4 2021 21:00').getTime(),
                new Date('July 5 2021 00:00').getTime(),
              ]}
              tickFormatter={(unixTime: number) => format(unixTime, 'HH:mm')}
              type="number"
              padding="gap"
              tickLine={false}
              strokeWidth="0.4"
              dy={10}
            />
            <YAxis
              domain={[0, 350]}
              ticks={[50, 100, 150, 200, 250, 300, 350]}
              tickLine={false}
              strokeWidth="0"
              dx={-10}
            />
            <Tooltip
              labelFormatter={(unixTime: number) => format(unixTime, 'HH:mm')}
              formatter={(value: number) => [
                `${value} mg/L`,
                t('Analytics.Value'),
              ]}
              itemStyle={{ color: '#8884d8' }}
            />
            <Line type="monotone" dataKey="val" stroke="#111" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </GraphWrapper>
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

  @media (min-width: 768px) {
    width: 60vw;
  }

  @media (min-width: 1024px) and (orientation: landscape) {
    width: calc(70% + 30px);
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

const GraphTitle = styled.label`
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: black;
  margin-top: 20px;
`;

export default DailyGraph;