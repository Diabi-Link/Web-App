import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const Progress = styled.div`
  display: flex;
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

const StepProgress = (): JSX.Element => {
  return (
    <Progress>
      <Step to="/register/user">
        <StepCircle>1</StepCircle>
        <StepText> Utilisateur</StepText>
      </Step>
      <Separator />
      <Step to="">
        <StepCircle>2</StepCircle>
        <StepText> Type de compte</StepText>
      </Step>
      <Separator />
      <Step to="">
        <StepCircle>3</StepCircle>
        <StepText> On y est presque !</StepText>
      </Step>
    </Progress>
  );
};

export default StepProgress;
