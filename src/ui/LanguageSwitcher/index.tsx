import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import FlagFR from '../../assets/pngs/flagFR.png';
import FlagEN from '../../assets/pngs/flagEN.png';

const Wrapper = styled.div`
  position: fixed;
  right: 0px;
  bottom: 0px;
  border-radius: 0.5rem;
  border: solid 0.1rem;
  border-color: ${(props) => props.theme.main.primary};
  background-color: ${(props) => props.theme.main.grayLighter};
  padding: 7px;
  margin: 10px;
  cursor: pointer;
  color: white;
  z-index: 10;

  @media (max-width: 420px) {
    padding: 6px;
    margin: 6px;
  }
`;

const Flag = styled.button`
  margin: 0 5px;
  background-color: transparent;
  padding: 0;
  border: none;
  cursor: pointer;

  @media (max-width: 420px) {
    width: 14px;
  }
`;

const Separator = styled.span`
  font-weight: bold;
  font-size: 16px;
  font-family: Raleway;
  margin-left: 5px;
  margin-right: 5px;
  color: ${(props) => props.theme.main.primary};
`;

const LanguageSwitcher = (): JSX.Element => {
  const { i18n } = useTranslation();

  const handleClick = (lang: any) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Wrapper>
      <Flag type="button" onClick={() => handleClick('fr')}>
        <img src={FlagFR} alt="FlagFR" width="16px" />
      </Flag>
      <Separator>|</Separator>
      <Flag type="button" onClick={() => handleClick('en')}>
        <img src={FlagEN} alt="FlagEN" width="16px" />
      </Flag>
    </Wrapper>
  );
};

export default LanguageSwitcher;
