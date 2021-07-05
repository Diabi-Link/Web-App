import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { send } from 'react-icons-kit/fa/send';

import Heading from '../../../../ui/Heading';
import Button from '../../../../ui/Button';

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
  const { t } = useTranslation();
  return (
    <Container>
      <Heading level={1}>{t('Register.Confirm.Title')}</Heading>
      <Description>{t('Register.Confirm.Desc')}</Description>
      <StyledButton
        type="button"
        label={t('Register.Confirm.ResendButton')}
        btnStyle="primary"
        shadow
        iconEnd={send}
      />
    </Container>
  );
};

export default Confirm;
