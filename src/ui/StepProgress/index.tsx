import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const Progress = styled.div`
  display: flex;
  margin: 20px;
`;

const Step = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
`;

const StepCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.main.primaryLighter};
  font-size: 14px;
  font-weight: 500;
  position: relative;
`;

const StepText = styled.p`
  font-size: 15px;
  font-weight: Bold;
  text-decoration: none;
`;

const Separator = styled.div`
  height: 1px;
  background-color: #424242;
  width: 100px;
  margin-top: 15px;
`;

const StepProgress = (): JSX.Element => {
  return (
    <Progress>
      <Step to="">
        <StepCircle />
        <StepText> Utilisateur</StepText>
      </Step>
      <Separator />
    </Progress>
  );
};

export default StepProgress;
