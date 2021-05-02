import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { arrowRight2 } from 'react-icons-kit/icomoon';
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { user } from 'react-icons-kit/fa/user';
import { ic_mail as mail } from 'react-icons-kit/md/ic_mail';
import { RegisterContext, RegisterActionTypes } from '../RegisterContext';

import { Input, Button, DateInput } from '../../../ui';

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
  margin: 40px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
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
  font-size: 17px;
  font-weight: 500;
`;

const ConnectLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 500;
  padding: 0px 10px;
  color: ${(props) => props.theme.main.primary};
`;

const NextButton = styled(Button)`
  width: 150px;
  height: 40px;
`;

const User = (): JSX.Element => {
  const [dateOfBirth, setdateOfBirth] = useState(new Date());
  const { push } = useHistory();
  const { state, dispatch } = useContext(RegisterContext);
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
              onChange={({ value }) =>
                dispatch({
                  type: RegisterActionTypes.UpdateUser,
                  payload: {
                    ...state.user,
                    firstName: value,
                  },
                })
              }
              required
              icon={user}
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Nom de famille</InputLabel>
            <Input
              name="lastName"
              type="text"
              placeholder="Carrasco"
              value="Test"
              // onChange={({ name }) => console.log(e)}
              required
              icon={user}
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
              // onChange={({ name }) => console.log(e)}
              required
              icon={mail}
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Date de naissance</InputLabel>
            <DateInput
              value={dateOfBirth}
              onChange={(date) => setdateOfBirth(date as Date)}
              icon={calendar}
            />
          </InputWrapper>
        </InfoWrapper>
        <ConnectionWrapper>
          <Text>Vous avez déjà un compte ?</Text>
          <ConnectLink to="/">Connectez-vous.</ConnectLink>
        </ConnectionWrapper>
        <ButtonWrapper>
          <NextButton
            label="Suivant"
            btnStyle="primary"
            shadow
            icon={arrowRight2}
            onClick={() => push('/register/account')}
          />
        </ButtonWrapper>
      </InfoContainer>
    </Container>
  );
};

export default User;
