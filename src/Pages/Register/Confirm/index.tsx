import React from 'react';
import styled from 'styled-components';
import { mailForward } from 'react-icons-kit/fa/mailForward';

import Heading from '../../../ui/Heading';
import Button from '../../../ui/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 4rem 0;

  @media (min-width: 1500px) {
    width: 80%;
    margin: 3rem 0;
  }
`;

const Description = styled.div`
  text-align: left;
  font-size: 17px;
  font-weight: 400;
  margin: 3rem 3.5rem 5rem;

  @media (min-width: 1500px) {
    font-size: 18px;
  }
`;

const StyledButton = styled(Button)`
  width: 200px;
  height: 40px;
`;

const Confirm = (): JSX.Element => {
  return (
    <Container>
      <Heading level={1}>Vérifiez votre email 📬</Heading>
      <Description>
        Votre inscription à bien été prise en compte. Un email va vous être
        envoyé prochainement avec un lien pour vérifier votre compte. Si vous
        n’avez pas recu ce mail après quelques minutes, pensez à vérifiez votre
        dossier spam.
      </Description>
      <StyledButton
        type="submit"
        label="Renvoyez le mail"
        btnStyle="primary"
        shadow
        iconEnd={mailForward}
        // onClick={() => onClick(4)}
      />
    </Container>
  );
};

export default Confirm;
