import React from 'react';
import styled from 'styled-components';
import { AccountType } from '../RegisterContext';

type Props = {
  type: AccountType;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 60ch;
`;

const Text = styled.p`
  animation: fadein 0.8s ease-in-out;
  margin: 0 0 0.8rem;
  line-height: 1.6;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ImportantWord = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.main.primary};
`;

const AccountInfoText = ({ type }: Props): JSX.Element => {
  return (
    <Container className="childContainer">
      {type === 'diabetic' && (
        <>
          <Text>
            Un compte <ImportantWord>Diabétique</ImportantWord> vous permet de
            sauvegarder et de consulter toutes les données relatives à votre
            diabète. Vous pouvez partager ces données avec vos proches ou
            médecins possédant un compte Proche ou Corps médical.
          </Text>
          <Text>
            Toutes les fonctionnalités de ce compte sont{' '}
            <ImportantWord>gratuites</ImportantWord>.
          </Text>
        </>
      )}
      {type === 'referent' && (
        <>
          <Text>
            Un compte <ImportantWord>Référent</ImportantWord> vous permet de
            suivre un proche possédant un compte Diabétique. Vous aurez accès
            aux donnéees relatives à son diabète et serez alerté en cas de
            mesures anormales.
          </Text>
          <Text>
            Ce compte est disponible à hauteur de{' '}
            <ImportantWord>4,99€ par mois</ImportantWord>.
          </Text>
        </>
      )}
      {type === 'medicalProfessional' && (
        <>
          <Text>
            Un compte <ImportantWord>Corps médical</ImportantWord> vous permet
            de suivre tous vos patients possédant un compte Diabétique. Vous
            aurez accès aux donnéees relatives à leur diabète et serez alerté en
            cas de mesures anormales.
          </Text>
          <Text>
            Ce compte est disponible à hauteur de{' '}
            <ImportantWord>19,99€ par mois</ImportantWord>.
          </Text>
        </>
      )}
    </Container>
  );
};

export default AccountInfoText;
