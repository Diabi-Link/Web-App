import React, { useEffect, useState } from 'react';
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

import jwtDecode from 'jwt-decode';
import Button from '../../../../ui/Button';
import {
  useGetContact,
  useGetDataLazyQuery,
  useGetDataOfLazyQuery,
} from '../../../../api';
import {
  formatTimeInTarget,
  pickDate,
  TimeInTargetData,
} from '../../../../utils';
import { useAuthToken } from '../../../../hooks/useAuthToken';
import Loader from '../../../../ui/Loader';
import { UserType } from '../../../../types/user';

let ctx: CanvasRenderingContext2D | null;

const colors = ['#FFB21D', '#FFED4D', '#18DBA0', '#F6404B'];

export const measureTextSize = ({
  text,
  size,
}: {
  text: string;
  size: number;
}) => {
  if (!ctx) {
    ctx = document.createElement('canvas').getContext('2d');
    if (ctx) {
      ctx.font = `${size}px 'Montserrat'`;
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
      y={y + 4}
      textAnchor="end"
      verticalAnchor="end"
      style={{ fontWeight: 500 }}
    >
      {value}
    </Text>
  );
};

const TimeInTargetGraph = ({
  userAccount,
  user,
}: {
  userAccount: UserType['account'] | undefined;
  user?: UserType | null;
}) => {
  const { t } = useTranslation();

  const activeButton = [true, false, false];
  const { authToken } = useAuthToken();
  const [isActive, setIsActive] = useState<boolean[]>(activeButton);
  const [period, setPeriod] = useState<number>(7);
  const [data, setData] = useState<TimeInTargetData[]>([
    {
      name: '> 240',
      percentage: 0,
    },
    {
      name: '181 - 240',
      percentage: 0,
    },
    {
      name: '70 - 180',
      percentage: 0,
    },
    {
      name: '< 70',
      percentage: 0,
    },
  ]);
  const handleClick = (id: number, day: number): void => {
    setIsActive(isActive.map((active, key) => key === id));
    setPeriod(day);
  };

  const [getData, { loading }] = useGetDataLazyQuery({
    onCompleted: (payload) => {
      const { getData: dataTab } = payload;
      setData(formatTimeInTarget(dataTab));
    },
    fetchPolicy: 'network-only',
  });

  const [getDataOf] = useGetDataOfLazyQuery({
    onCompleted: (payload) => {
      const { getDataOf: dataTab } = payload;
      setData(formatTimeInTarget(dataTab));
    },
    fetchPolicy: 'network-only',
  });

  const { data: contacts } = useGetContact();

  useEffect(() => {
    if (authToken && userAccount === 'patient') {
      const decrypted: { userId: number } = jwtDecode(authToken);
      getData({
        variables: {
          from: new Date(pickDate('days', period)),
          to: new Date(),
          userID: decrypted.userId,
        },
      });
    } else if (
      (userAccount === 'referent' || userAccount === 'medicalProfessional') &&
      user &&
      contacts &&
      contacts.Me.contact.length > 0
    ) {
      getDataOf({
        variables: {
          from: new Date(pickDate('days', period)),
          to: new Date(),
          userID: parseInt(user.id.toString(), 10),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, contacts, user]);

  return (
    <Container>
      <TitleWrapper>
        <GraphTitle>{t('Analytics.TimeInTarget')}</GraphTitle>
      </TitleWrapper>
      <GraphWrapper>
        <ResponsiveContainer height={200}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              left: 40,
              right:
                20 +
                measureTextSize({
                  text: '100%',
                  size: 15,
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
              barSize={26}
            >
              {data.map((d, idx) => {
                return <Cell key={d.name} fill={colors[idx]} radius={4} />;
              })}
              <LabelList
                dataKey="percentage"
                position="right"
                fontWeight={500}
                fontSize={15}
                formatter={(label: string) =>
                  `${parseFloat(label).toFixed(0)}%`
                }
                fill="#111"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </GraphWrapper>
      <ButtonsWrapper>
        <DataButton
          type="submit"
          label={
            loading && period === 7 ? (
              <Loader loaderStyle="white" />
            ) : (
              t('Analytics.7')
            )
          }
          btnStyle="primary"
          shadow
          isActive={isActive[0]}
          onClick={() => handleClick(0, 7)}
          data-testid="time-target-7"
        />
        <DataButton
          type="submit"
          label={
            loading && period === 14 ? (
              <Loader loaderStyle="white" />
            ) : (
              t('Analytics.14')
            )
          }
          btnStyle="primary"
          shadow
          isActive={isActive[1]}
          onClick={() => handleClick(1, 14)}
          data-testid="time-target-14"
        />
        <DataButton
          type="submit"
          label={
            loading && period === 30 ? (
              <Loader loaderStyle="white" />
            ) : (
              t('Analytics.30')
            )
          }
          btnStyle="primary"
          shadow
          isActive={isActive[2]}
          onClick={() => handleClick(2, 30)}
          data-testid="time-target-30"
        />
      </ButtonsWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.main.whiteDarker};
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
  font-weight: 500;
  color: black;
  margin-top: 20px;
`;

const DataButton = styled(Button)<{
  isActive: boolean;
}>`
  width: 6rem;
  margin: 1.5rem 0.5rem;
  background-color: ${({ isActive }) => (isActive ? 'white' : 0)};
  color: ${({ isActive }) => (isActive ? 'black' : 0)};
  &:hover:not(:disabled) {
    background-color: ${({ isActive }) => (isActive ? 'white' : 0)};
  }
`;

export default TimeInTargetGraph;
