import React from 'react';
import styled from 'styled-components';

const Footer = (): React.ReactElement => {
  return (
    <Container>
      <StyledInput placeholder="Écrivez votre message..." />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.main.whiteBroken};
  margin: 20px 0;
`;

const StyledInput = styled.input`
  border: none;
  height: 45px;
  padding: 0 20px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.main.white};
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.main.dark};
  &:placeholder {
    color: ${(props) => props.theme.main.gray};
  }
  &:focus {
    outline: none;
  }
`;

export default Footer;
