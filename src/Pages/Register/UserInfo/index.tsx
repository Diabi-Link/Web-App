import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Input } from '../../../ui';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  @media (min-width: 1700px) {
    width: 70%;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0px;
  @media (min-width: 1700px) {
    margin: 30px 0px 20px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const ConnectionWrapper = styled.div`
  display: flex;
  margin: 20px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin: 15px 5px;
`;

const Title = styled.p`
  font-size: 30px;
  @media (min-width: 1700px) {
    font-size: 35px;
  }
  font-weight: 700;
  color: ${(props) => props.theme.main.dark};
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const ConnectLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  padding: 0px 10px;
  color: ${(props) => props.theme.main.primary};
`;

const User = (): JSX.Element => {
  return (
    <Container>
      <Title>Vous souhaitez nous rejoindre ? </Title>
      <InfoContainer>
        <InfoWrapper>
          <InputWrapper>
            <InputLabel>Prénom</InputLabel>
            <Input
              name="firstName"
              type="text"
              placeholder="Nicolas"
              value="Test"
              required
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Nom de famille</InputLabel>
            <Input
              name="lastName"
              type="text"
              placeholder="Carrasco"
              value="Test"
              required
            />
          </InputWrapper>
        </InfoWrapper>
        <InfoWrapper>
          <InputWrapper>
            <InputLabel>Adresse email</InputLabel>
            <Input
              name="email"
              type="text"
              placeholder="Nicolas.Carrasco@gmail.com"
              value="Test"
              required
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Date de naissance</InputLabel>
            <Input
              name="lastName"
              type="text"
              placeholder="06/09/2000"
              value="Test"
              required
            />
          </InputWrapper>
        </InfoWrapper>
        <ConnectionWrapper>
          <Text>Vous avez déjà un compte ?</Text>
          <ConnectLink to="/">Connectez-vous.</ConnectLink>
        </ConnectionWrapper>
      </InfoContainer>
    </Container>
  );
};

export default User;
