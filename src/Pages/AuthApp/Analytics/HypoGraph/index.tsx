import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ResponsiveContainer, BarChart, XAxis, LabelList, Bar } from 'recharts';
import jwtDecode from 'jwt-decode';
import { useGetDataLazyQuery } from '../../../../api';
import { useAuthToken } from '../../../../hooks/useAuthToken';
import { pickDate, formatHypo, HypoData } from '../../../../utils';

import Button from '../../../../ui/Button';
import Loader from '../../../../ui/Loader';

const HypoGraph = () => {
  const { t } = useTranslation();
  const { authToken } = useAuthToken();

  const activeButton = [true, false, false];
  const [isActive, setIsActive] = useState<boolean[]>(activeButton);
  const [period, setPeriod] = useState<number>(7);
  const [data, setData] = useState<HypoData[]>([]);
  const handleClick = (id: number, day: number): void => {
    setIsActive(isActive.map((active, key) => key === id));
    setPeriod(day);
  };

  const [getData, { loading }] = useGetDataLazyQuery({
    onCompleted: (payload) => {
      const { getData: dataTab } = payload;
      const hypoData = formatHypo(dataTab);
      setData(hypoData);
    },
  });

  useEffect(() => {
    if (authToken) {
      const decrypted: { userId: number } = jwtDecode(authToken);
      getData({
        variables: {
          from: new Date(pickDate('days', period)),
          to: new Date(),
          userID: decrypted.userId,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  return (
    <Container>
      <TitleWrapper>
        <GraphTitle>{t('Analytics.Low')}</GraphTitle>
      </TitleWrapper>
      <GraphWrapper>
        <ResponsiveContainer height={140}>
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
              animationDuration={500}
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
          disabled={loading && period === 7}
          data-testid="hypo-7"
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
          disabled={loading && period === 14}
          data-testid="hypo-14"
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
          disabled={loading && period === 30}
          data-testid="hypo-30"
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
  width: 6rem;
  margin: 1.5rem 0rem;
  background-color: ${({ isActive }) => (isActive ? 'white' : 0)};
  color: ${({ isActive }) => (isActive ? 'black' : 0)};
  &:hover:not(:disabled) {
    background-color: ${({ isActive }) => (isActive ? 'white' : 0)};
  }
`;

export default HypoGraph;
