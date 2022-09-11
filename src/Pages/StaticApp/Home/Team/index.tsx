import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Member1 from '../../../../assets/pngs/Member1.png';
import Member2 from '../../../../assets/pngs/Member2.png';

import Heading from '../../../../ui/Heading';

const Team = () => {
  const { t } = useTranslation();

  const Members = [
    {
      name: 'Djahid Bousba',
      role: t('Team.FrontDev'),
      icon: <img src={Member1} alt="Member1" />,
    },
    {
      name: 'Nicolas Carrasco',
      role: t('Team.FrontDev'),
      icon: <img src={Member1} alt="Member1" />,
    },
    {
      name: 'Théo Henault',
      role: t('Team.BackDev'),
      icon: <img src={Member1} alt="Member1" />,
    },
    {
      name: 'Mathis Paroissien',
      role: t('Team.iOSDev'),
      icon: <img src={Member1} alt="Member1" />,
    },
    {
      name: 'Thibault Schmitt',
      role: t('Team.BackDev'),
      icon: <img src={Member2} alt="Member2" />,
    },
    {
      name: 'Laurent Sferlazza',
      role: t('Team.AndroidDev'),
      icon: <img src={Member1} alt="Member1" />,
    },
  ];

  return (
    <TeamContainer id="team">
      <TeamWrapper>
        <Title level={1}>{t('Team.Title')}</Title>
        <TeamListWrapper>
          {Members.map(({ name, role, icon }) => (
            <MemberBox>
              {icon}
              <Heading level={2}>{name}</Heading>
              <Content level={3}>{role}</Content>
            </MemberBox>
          ))}
        </TeamListWrapper>
      </TeamWrapper>
    </TeamContainer>
  );
};

const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 3rem;

  @media (orientation: portrait) and (max-width: 600px) {
    padding: 2rem;
  }
`;

const TeamWrapper = styled.div`
  color: white;
  width: 80vw;
`;

const TeamListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MemberBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 12rem;
  width: 30%;

  @media (max-width: 600px) {
    width: 90%;
    margin-bottom: 2rem;
  }

  :nth-child(3n) {
    margin-bottom: 2rem;
  }

  & > img {
    width: 7rem;
  }
`;

const Title = styled(Heading)`
  position: relative;

  &:before {
    content: '';
    height: 2.5px;
    width: 8rem;
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
  }
  font-size: 2.2rem;
  margin-bottom: 6rem;
`;

const Content = styled(Heading)`
  font-weight: 600;
  font-size: 0.9rem;
  font-style: italic;
`;

export default Team;
