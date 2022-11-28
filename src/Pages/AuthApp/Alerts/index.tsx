import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-icons-kit';
import { ic_close as CloseIcon } from 'react-icons-kit/md/ic_close';

import { NotificationType } from '../../../types/notification';
import { pickDate } from '../../../utils';
import { useGetAlertsLazyQuery } from '../../../api';

import { UserContext } from '../../../contexts/UserContext';

import { ReactComponent as GreenIconSvg } from '../../../assets/svgs/GreenIcon.svg';
import { ReactComponent as YellowIconSvg } from '../../../assets/svgs/YellowIcon.svg';
import { ReactComponent as OrangeIconSvg } from '../../../assets/svgs/OrangeIcon.svg';
import { ReactComponent as RedIconSvg } from '../../../assets/svgs/RedIcon.svg';

import { Heading, PageTitle } from '../../../ui/Heading';
import Button from '../../../ui/Button';

interface Flags {
  color: string;
  border: string;
  name: string;
  isActive: boolean;
  icon: any;
}

const FlagsTab = (): Flags[] => {
  return [
    {
      color: '#B5F9E4',
      border: '#18DBA0',
      name: 'green',
      isActive: true,
      icon: <GreenIconSvg />,
    },
    {
      color: '#FFE792',
      border: '#E7D006',
      name: 'yellow',
      isActive: true,
      icon: <YellowIconSvg />,
    },
    {
      color: '#FFC267',
      border: '#FF9C27',
      name: 'orange',
      isActive: true,
      icon: <OrangeIconSvg />,
    },
    {
      color: '#FF9A9A',
      border: '#F6404B',
      name: 'red',
      isActive: true,
      icon: <RedIconSvg />,
    },
  ];
};

const Alerts = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    state: { user },
  } = useContext(UserContext);

  const activeButton = [true, false, false, false];
  const [isActiveButton, setIsActiveButton] = useState<boolean[]>(activeButton);
  const [flags, setFlags] = useState<Flags[]>(FlagsTab());
  const [alerts, setAlerts] = useState<NotificationType[]>();
  const [deleteTab, setDeleteTab] = useState<string[]>([]);

  const typeRef = useRef<string>('');
  const periodRef = useRef<number | null>(null);

  const [getAlerts] = useGetAlertsLazyQuery({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    pollInterval: 2000,
    onCompleted: (payload: any) => {
      const { getAlertHistory: alertsTab } = payload;
      setAlerts(alertsTab);
      if (!user) return;
      const type = typeRef.current || 'days';
      const period = periodRef.current || 365;
      getAlerts({
        variables: {
          from: new Date(pickDate(type, period)),
          to: new Date(),
          userID: parseFloat(user.id.toString()),
        },
      });
    },
  });

  useEffect(() => {
    getAlerts({
      variables: {
        from: new Date(pickDate('days', 365)),
        to: new Date(),
        userID: parseFloat(user?.id.toString() || ''),
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (id: number, type: string, period: number): void => {
    if (!user) return;
    typeRef.current = type;
    periodRef.current = period;
    setIsActiveButton(isActiveButton.map((active, key) => key === id));
    getAlerts({
      variables: {
        from: new Date(pickDate(type, period)),
        to: new Date(),
        userID: parseFloat(user.id.toString()),
      },
    });
  };

  const handleFlagClick = (color: string): void => {
    setFlags(
      flags.map((f) =>
        f.color === color ? { ...f, isActive: !f.isActive } : f,
      ),
    );
  };

  const handleDelete = (message: string) => {
    setDeleteTab([...deleteTab, message]);
  };

  return (
    <Container data-testid="auth-alert-page">
      <Wrapper>
        <PageTitle level={1}>{t('Alerts.Title')}</PageTitle>
        <FilterWrapper>
          <FilterButton
            data-testid="auth-alert-btn1"
            id="all"
            type="submit"
            label={t('Alerts.All')}
            btnStyle="primary"
            shadow
            isActive={isActiveButton[0]}
            onClick={() => handleClick(0, 'days', 365)}
          />
          <FilterButton
            data-testid="auth-alert-btn2"
            id="1hour"
            type="submit"
            label={t('Alerts.1hour')}
            btnStyle="primary"
            shadow
            isActive={isActiveButton[1]}
            onClick={() => handleClick(1, 'hours', 1)}
          />
          <FilterButton
            data-testid="auth-alert-btn3"
            id="1day"
            type="submit"
            label={t('Alerts.24hours')}
            btnStyle="primary"
            shadow
            isActive={isActiveButton[2]}
            onClick={() => handleClick(2, 'days', 1)}
          />
          <FilterButton
            data-testid="auth-alert-btn4"
            id="7days"
            type="submit"
            label={t('Alerts.1week')}
            btnStyle="primary"
            shadow
            isActive={isActiveButton[3]}
            onClick={() => handleClick(3, 'days', 7)}
          />
        </FilterWrapper>
        <FlagWrapper>
          <FilterTitle level={2}>{t('Alerts.Filter')}</FilterTitle>
          {flags.map(({ name, color, isActive }, idx) => (
            <FlagButton
              key={`flag-${name}`}
              type="submit"
              label=""
              btnStyle="primary"
              shadow
              isActive={isActive}
              fill={color}
              onClick={() => handleFlagClick(color)}
              data-testid={`flag-${idx}`}
            />
          ))}
        </FlagWrapper>
        <AlertsWrapper>
          {
            // loading || networkStatus === NetworkStatus.refetch ? (
            //   <Loader loaderStyle="primary" size={14} />
            // ) : (
            /* istanbul ignore next */
            alerts
              /* istanbul ignore next */
              ?.filter(
                /* istanbul ignore next */
                (v) =>
                  flags.find((f) => f.name === v.flag)?.isActive &&
                  !deleteTab.includes(v.message),
              )
              .map(
                /* istanbul ignore next */
                (v) => (
                  <StyledBox
                    color={
                      flags.find((f) => f.name === v.flag)?.color || 'green'
                    }
                  >
                    <Border
                      color={
                        flags.find((f) => f.name === v.flag)?.border || 'green'
                      }
                    />
                    <Info>
                      <AlertIconWrapper>
                        {flags.find((f) => f.name === v.flag)?.icon}
                      </AlertIconWrapper>
                      <InfoText level={3}>{v?.message}</InfoText>
                    </Info>
                    <IconWrapper
                      type="submit"
                      data-testid="trash-button"
                      onClick={() => handleDelete(v?.message)}
                      color={
                        flags.find((f) => f.name === v.flag)?.color || 'green'
                      }
                    >
                      <Icon icon={CloseIcon} size={25} />
                    </IconWrapper>
                  </StyledBox>
                ),
              )
            // )
          }
          {/* {} */}
        </AlertsWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100vw;
  height: 100vh;

  @media (min-width: 1024px) and (orientation: landscape) {
    width: 85vw;
  }
`;

const AlertsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: scroll;
  height: 100%;
  width: 90vw;
  @media (min-width: 1200px) {
    width: 80vw;
  }
  margin-bottom: 2rem;
`;

const Border = styled.div<{
  color: string;
}>`
  left: 0;
  position: absolute;
  border-radius: 10px 0 0 10px;
  height: 100%;
  width: 1%;
  background-color: ${({ color }) => color};
`;

const StyledBox = styled.div<{
  color: string;
}>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-around;
  min-height: 3.5rem;
  margin: 1.5rem 0;
  width: 95%;
  border-radius: 10px;
  box-shadow: ${({ theme }) =>
    `0 0.063rem 0.17rem 0.033rem ${theme.main.darkLighter}`};
  background-color: ${({ color }) => color};
`;

const AlertIconWrapper = styled.div`
  display: flex;
  & > svg {
    width: 2rem;
  }
  margin-right: 1rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
`;

const InfoText = styled(Heading)`
  font-size: 1rem;
  font-weight: 500;
`;

const IconWrapper = styled.button<{
  color: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  background-color: ${({ color }) => color};
  width: 2rem;
  height: 2rem;
  border-radius: 10px;
  cursor: pointer;

  @media (min-width: 1500px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90vw;
  margin: 5rem auto 2rem;

  @media (min-width: 1200px) {
    margin: 2rem 0;
    width: 85vw;
  }
`;

const FlagWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 90vw;

  @media (min-width: 1200px) {
    width: 80vw;
  }
`;

const FilterTitle = styled(Heading)`
  position: relative;
  color: ${({ theme }) => theme.main.primaryLight};
  font-size: 0.8rem;
  padding: 1rem 0 1rem 1.5rem;
  margin-left: 1rem;
  &:before {
    content: '';
    height: 3px;
    width: 1rem;
    position: absolute;
    top: 50%;
    left: 0;
    background-color: ${({ theme }) => theme.main.primaryLight};
  }

  @media (min-width: 768px) {
    padding-left: 2.5rem;
    margin-left: 4rem;
    font-size: 1.3rem;
    &:before {
      width: 2rem;
    }
  }

  @media (min-width: 1024px) {
    margin-left: 5rem;
  }

  @media (min-width: 1200px) {
    margin-left: 4rem;
  }
`;

const FilterButton = styled(Button)<{
  isActive: boolean;
}>`
  width: 40%;
  margin: 1.5rem 1rem;
  padding: 0.6rem 0.5rem;
  font-size: 0.8rem;
  background-color: ${({ isActive }) => (isActive ? 'white' : 0)};
  color: ${({ isActive }) => (isActive ? 'black' : 0)};
  &:hover:not(:disabled) {
    background-color: ${({ isActive }) => (isActive ? 'white' : 0)};
  }

  @media (min-width: 1200px) {
    width: 20%;
    margin: 1rem 1.5rem;
    font-size: 0.8rem;
  }
`;

const FlagButton = styled(Button)<{
  isActive: boolean;
  fill: string;
}>`
  width: ${({ isActive }) => (isActive ? '1rem' : '0.9rem')};
  height: ${({ isActive }) => (isActive ? '1rem' : '0.9rem')};
  border-radius: 0.3rem;
  border: 0.1rem solid black;
  padding: 0;
  margin: 1.5rem 1rem;
  background-color: ${({ fill }) => fill};
  &:hover:not(:disabled) {
    background-color: ${({ fill }) => fill};
  }

  @media (min-width: 1200px) {
    width: ${({ isActive }) => (isActive ? '1.2rem' : '1rem')};
    height: ${({ isActive }) => (isActive ? '1.2rem' : '1rem')};
  }
`;

export default Alerts;
