import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { checkmark as check } from 'react-icons-kit/icomoon/checkmark';
import { Theme } from '../../theme';

type Props = {
  step: number;
  locations: Array<{
    path: string;
    description: string;
  }>;
};

const Progress = styled.div`
  display: flex;
`;

const Step = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${(props) => props.theme.main.dark};
`;

const StepCircle = styled.div<{
  checked: boolean;
  actual: boolean;
  theme: Theme;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ actual, checked, theme }) => {
    if (actual) return theme.main.primaryLighter;
    if (checked) return theme.main.primary;
    return theme.main.grayLight;
  }};
  font-size: 14px;
  font-weight: 800;
  position: relative;
`;

const StepText = styled.p`
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
`;

const Separator = styled.div`
  height: 1px;
  background-color: #424242;
  width: 140px;
  margin: 15px;
`;

const StepProgress = ({ step, locations }: Props): JSX.Element => {
  return (
    <Progress>
      {locations.map((location, key) => (
        <>
          <Step to={location.path}>
            <StepCircle checked={step >= key + 2} actual={step === key + 1}>
              {step >= key + 2 ? <Icon icon={check} size={13} /> : key + 1}
            </StepCircle>
            <StepText>{location.description}</StepText>
          </Step>
          {key + 1 !== locations.length && <Separator />}
        </>
      ))}
    </Progress>
  );
};

export default StepProgress;
