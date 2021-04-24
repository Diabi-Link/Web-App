import React from 'react';
import styled from 'styled-components';
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
  width: 70%;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 50px 0px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin: 15px 5px;
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: 700;
  color: ${(props) => props.theme.main.dark};
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
      </InfoContainer>
    </Container>
  );
};

export default User;
