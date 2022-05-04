import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Heading from '../../../ui/Heading';
import Button from '../../../ui/Button';

const colors = ['#42C505', '#FFE500', '#FFA800', '#E10303'];

const Alerts = (): JSX.Element => {
  const { t } = useTranslation();

  const activeButton = [true, false, false, false];
  const flagButton = [false, false, false, false];
  const [isActive, setIsActive] = useState<boolean[]>(activeButton);
  const [isActiveFlag, setIsActiveFlag] = useState<boolean[]>(flagButton);

  const handleClick = (id: number): void => {
    setIsActive(isActive.map((active, key) => key === id));
  };

  const handleFlagClick = (id: number): void => {
    setIsActiveFlag(
      isActiveFlag.map((active, key) => (key === id ? !active : active)),
    );
  };

  return (
    <Container data-testid="auth-alert-page">
      <Wrapper>
        <PageTitle level={1}>{t('Alerts.Title')}</PageTitle>
        <FilterWrapper>
          <FilterButton
            type="submit"
            label={t('Alerts.All')}
            btnStyle="primary"
            shadow
            isActive={isActive[0]}
            onClick={() => handleClick(0)}
            data-testid="hypo-7"
          />
          <FilterButton
            type="submit"
            label={t('Alerts.1hour')}
            btnStyle="primary"
            shadow
            isActive={isActive[1]}
            onClick={() => handleClick(1)}
            data-testid="hypo-14"
          />
          <FilterButton
            type="submit"
            label={t('Alerts.24hours')}
            btnStyle="primary"
            shadow
            isActive={isActive[2]}
            onClick={() => handleClick(2)}
            data-testid="hypo-30"
          />
          <FilterButton
            type="submit"
            label={t('Alerts.1week')}
            btnStyle="primary"
            shadow
            isActive={isActive[3]}
            onClick={() => handleClick(3)}
            data-testid="hypo-34"
          />
        </FilterWrapper>
        <FlagWrapper>
          <FilterTitle level={2}>{t('Alerts.Filter')}</FilterTitle>
          {colors.map((c, idx) => (
            <FlagButton
              type="submit"
              label=""
              btnStyle="primary"
              shadow
              isActive={isActiveFlag[idx]}
              fill={c}
              onClick={() => handleFlagClick(idx)}
              data-testid={`flag-${idx}`}
            />
          ))}
        </FlagWrapper>
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

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90vw;
  margin: 5rem auto 2rem;

  @media (min-width: 1200px) {
    margin: 2rem 0;
    width: 80vw;
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

const PageTitle = styled(Heading)`
  position: relative;
  color: ${({ theme }) => theme.main.primaryLight};
  margin-top: 2rem;
  text-align: center;

  &:before,
  &:after {
    content: '';
    height: 10%;
    top: 50%;
    position: absolute;
  }

  &:before {
    background-color: ${({ theme }) => theme.main.whiteBroken};
    left: -1.5em;
    right: -1.5em;
    z-index: -1;
    height: 101%;
  }

  &:after {
    left: 50%;
    transform: translateX(-50%);
    width: 80vw;
    z-index: -2;
    background-color: ${({ theme }) => theme.main.primaryLight};
  }

  @media (max-width: 1200px) {
    display: none;
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
  font-size: 0.8rem;
  background-color: ${({ isActive }) => (isActive ? 'white' : 0)};
  color: ${({ isActive }) => (isActive ? 'black' : 0)};
  &:hover:not(:disabled) {
    background-color: ${({ isActive }) => (isActive ? 'white' : 0)};
  }

  @media (min-width: 1200px) {
    width: 20%;
    margin: 1.5rem 2rem;
    font-size: 1rem;
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
    width: ${({ isActive }) => (isActive ? '1.5rem' : '1rem')};
    height: ${({ isActive }) => (isActive ? '1.5rem' : '1rem')};
  }
`;

export default Alerts;
