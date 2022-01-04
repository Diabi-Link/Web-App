import React, { useState, useEffect } from 'react';
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
import jwtDecode from 'jwt-decode';
import { useAuthToken } from '../../../../hooks/useAuthToken';
import { useGetDataLazyQuery } from '../../../../api';
import {
  // pickDate,
  formatDaily,
  dailyBrain,
  // getDailyTicks,
  // getDailyDomain,
  DailyData,
  BrainData,
} from '../../../../utils';

const DailyGraph = () => {
  const { t } = useTranslation();
  const { authToken } = useAuthToken();

  const [data, setData] = useState<DailyData[]>([]);
  const [brain, setBrain] = useState<BrainData>();

  const [getData, { loading }] = useGetDataLazyQuery({
    onCompleted: (payload) => {
      const { getData: dataTab } = payload;
      // const dailyTicks = getDailyTicks();
      // const dailyDomain = getDailyDomain();
      const dailyData = formatDaily(dataTab);
      setData(dailyData);
      const brainData = dailyBrain(dataTab);
      setBrain(brainData);
    },
  });

  useEffect(() => {
    if (authToken) {
      const decrypted: { userId: number } = jwtDecode(authToken);
      getData({
        variables: {
          from: new Date('January 10 2022 00:00'),
          to: new Date('January 11 2022 00:00'),
          userID: decrypted.userId,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <Container>
      <TitleWrapper>
        <GraphTitle>{t('Analytics.Daily')}</GraphTitle>
      </TitleWrapper>
      <GraphWrapper>
        <ResponsiveContainer height={200}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 5,
            }}
            layout="horizontal"
          >
            <ReferenceArea
              x1={new Date('January 10 2022 00:00').getTime()}
              x2={new Date('January 11 2022 00:00').getTime()}
              y1={70}
              y2={170}
              strokeOpacity={0}
              fill="rgb(255, 255, 255)"
            />
            <CartesianGrid vertical={false} stroke="#B4B4B4" strokeWidth={1} />
            <XAxis
              dataKey="time"
              domain={[
                new Date('January 10 2022 00:00').getTime(),
                new Date('January 11 2022 00:00').getTime(),
              ]}
              ticks={[
                new Date('January 10 2022 00:00').getTime(),
                new Date('January 10 2022 03:00').getTime(),
                new Date('January 10 2022 06:00').getTime(),
                new Date('January 10 2022 09:00').getTime(),
                new Date('January 10 2022 12:00').getTime(),
                new Date('January 10 2022 15:00').getTime(),
                new Date('January 10 2022 18:00').getTime(),
                new Date('January 10 2022 21:00').getTime(),
                new Date('January 10 2022 23:59').getTime(),
              ]}
              tickFormatter={(unixTime: number) => format(unixTime, 'HH:mm')}
              type="number"
              padding="gap"
              strokeWidth="0.4"
              tickCount={9}
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
            <Line dataKey="val" stroke="#111" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </GraphWrapper>
      <InfoWrapper>
        <Info>
          {t('Analytics.TimeInTarget')} : {brain?.timeInTarget}%
        </Info>
        <Info>
          {t('Analytics.LastScan')} : {brain?.lastScan}
        </Info>
        <Info>
          {t('Analytics.Average')} : {brain?.average} mg/dL
        </Info>
      </InfoWrapper>
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

  @media (min-width: 768px) {
    width: 60vw;
  }

  @media (min-width: 1024px) and (orientation: landscape) {
    width: calc(71%);
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

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 2rem 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Info = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: black;
`;

export default DailyGraph;
