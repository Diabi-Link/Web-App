import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ContactRequestType } from '../../../../types/contactRequest';
import { Heading } from '../../../../ui/Heading';
import { ReactComponent as ProfilePatient } from '../../../../assets/svgs/ProfilePatient.svg';
import Button from '../../../../ui/Button';

type Props = {
  handleChoice: (choice: boolean, contactRequest: ContactRequestType) => void;
  contactRequest: ContactRequestType;
};

const Card = ({ handleChoice, contactRequest }: Props) => {
  const { t } = useTranslation();

  return (
    <StyledBox>
      <AvatarWrapper>
        <ProfilePatient />
      </AvatarWrapper>
      <InfoWrapper>
        <Heading level={2}>
          {contactRequest.firstName} {contactRequest.lastName}
        </Heading>
        <Mail level={3}>Mail : {contactRequest.email}</Mail>
        <ButtonBox>
          <StyledButton
            data-testid="accept-button"
            label={t('Contacts.Accept')}
            btnStyle="green"
            outlined
            onClick={() => handleChoice(true, contactRequest)}
          />
          <StyledButton
            data-testid="decline-button"
            label={t('Contacts.Decline')}
            btnStyle="red"
            outlined
            onClick={() => handleChoice(false, contactRequest)}
          />
        </ButtonBox>
      </InfoWrapper>
    </StyledBox>
  );
};

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 6rem;
  width: 100%;
  border-radius: 10px;
  border: ${({ theme }) => `3px solid ${theme.main.primaryLighter}`};
  box-shadow: ${({ theme }) =>
    `0 0.063rem 0.17rem 0.033rem ${theme.main.grayLight}`};
  background-color: ${({ theme }) => theme.main.white};
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ theme }) => `2px solid ${theme.main.primaryLight}`};
  background-color: ${(props) => props.theme.main.primaryLighter};
  width: 3rem;
  height: 3rem;
  border-radius: 10px;

  & > svg {
    height: 70%;
  }

  @media (min-width: 768px) {
    width: 4rem;
    height: 4rem;
    border-radius: 15px;

    & > svg {
      height: 90%;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  width: 4.5rem;
  font-size: 0.7rem;
  margin: 0 0.3rem;

  @media (min-width: 768px) {
    width: 7.5rem;
    font-size: 1rem;
    margin: 0 0.5rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 75%;

  & > h2 {
    font-weight: 600;
    font-size: 0.7rem;
  }

  @media (min-width: 768px) {
    & > h2 {
      font-size: 1rem;
    }
    & > h3 {
      font-weight: 400;
      font-size: 0.9rem;
    }
  }
`;

const Mail = styled(Heading)`
  display: none;

  @media (min-width: 1300px) and (orientation: landscape) {
    display: block;
  }
`;

export default Card;
