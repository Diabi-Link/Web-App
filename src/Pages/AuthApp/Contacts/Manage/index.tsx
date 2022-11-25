import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';

import { Icon } from 'react-icons-kit';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';

import { ReactComponent as ProfilePatient } from '../../../../assets/svgs/ProfilePatient.svg';

import Button from '../../../../ui/Button';
import { Heading } from '../../../../ui/Heading';

const Manage = (): JSX.Element => {
  const { push } = useHistory();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [accept, setAccept] = useState<boolean>(false);

  const handleChoice = async (choice: boolean) => {
    setIsOpen(true);
    setAccept(choice);
  };

  return (
    <>
      <Container data-testid="auth-contacts-list-page" isOpen={isOpen}>
        <PageTitle level={2}>{t('Contacts.Request')}</PageTitle>
        <ListContainer>
          <ListWrapper>
            <List>
              <StyledBox>
                <AvatarWrapper>
                  <ProfilePatient />
                </AvatarWrapper>
                <InfoWrapper>
                  <Heading level={2}>Mathis Paroissien</Heading>
                  <Mail level={3}>Mail : mathis@test.fr</Mail>
                  <ButtonBox>
                    <StyledButton
                      data-testid="accept-button"
                      label={t('Contacts.Accept')}
                      btnStyle="green"
                      outlined
                      onClick={() => handleChoice(true)}
                    />
                    <StyledButton
                      data-testid="decline-button"
                      label={t('Contacts.Decline')}
                      btnStyle="red"
                      outlined
                      onClick={() => handleChoice(false)}
                    />
                  </ButtonBox>
                </InfoWrapper>
              </StyledBox>
            </List>
          </ListWrapper>
        </ListContainer>
        <ButtonWrapper>
          <BackLink to="/contacts/menu">
            <ArrowBack icon={arrowLeft2} size={20} />
            <Text>{t('Link.Back')}</Text>
          </BackLink>
          <Button
            type="submit"
            label={t('Contacts.Add')}
            btnStyle="primary"
            shadow
            iconEnd={arrowRight2}
            onClick={() => push('/contacts/add')}
            data-testid="next-button"
          />
        </ButtonWrapper>
      </Container>
      {isOpen && (
        <Modal accept={accept}>
          <ModalTitle level={2} accept={accept}>
            {accept ? t('Contacts.Accept') : t('Contacts.Decline')}
          </ModalTitle>

          <InputLabel>
            {accept ? t('Contacts.AddText') : t('Contacts.DeclineText')}
          </InputLabel>

          <ButtonBox>
            <StyledButton
              type="submit"
              label={t('Contacts.Decline')}
              btnStyle="red"
              outlined
              data-testid="decline-button"
              onClick={() => setIsOpen(false)}
            />
            <StyledButton
              type="submit"
              label={t('Contacts.Validate')}
              btnStyle="green"
              outlined
              data-testid="validate-button"
              onClick={() => setIsOpen(false)}
            />
          </ButtonBox>
        </Modal>
      )}
    </>
  );
};

const Container = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  height: 100%;
  width: 90vw;
  justify-content: flex-start;
  align-items: center;
  filter: ${({ isOpen }) => `${isOpen ? 'blur(5px)' : ''}`};

  @media (min-width: 768px) {
    width: 80vw;
  }
`;

const PageTitle = styled(Heading)`
  position: relative;
  color: ${({ theme }) => theme.main.primaryLight};
  padding: 0 4rem;
  &:before {
    content: '';
    height: 3px;
    width: 3rem;
    position: absolute;
    top: 50%;
    left: 0;
    background-color: ${({ theme }) => theme.main.primaryLight};
  }
`;

const ListContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-self: flex-end;
  height: 70%;
`;

const ListWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;

  & > div > div {
    margin: 0.5rem 0;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  width: 100%;
  height: 100%;
`;

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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  align-items: center;

  @media (min-width: 1024px) and (orientation: landscape) {
    flex-direction: row;
    width: calc(50% + 8rem);
    justify-content: space-between;
  }
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin: 1rem 0;
  align-self: flex-start;
`;

const ArrowBack = styled(Icon)`
  color: ${({ theme }) => theme.main.primary};
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  padding: 0px 10px;
  color: ${(props) => props.theme.main.primary};
`;

const Modal = styled.div<{ accept: boolean }>`
  display: flex;
  position: absolute;
  top: calc(50% - 9rem);
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 18rem;
  width: 90vw;
  border-radius: 10px;
  border: ${({ accept, theme }) =>
    `3px solid ${accept ? theme.main.green : theme.main.red}`};
  box-shadow: ${({ theme }) =>
    `0 0.063rem 0.17rem 0.033rem ${theme.main.grayLight}`};

  background-color: ${({ theme }) => theme.main.white};
  backdrop-filter: blur(5px);

  & > form {
    display: flex;
    flex-direction: column;
    width: 90%;
  }

  @media (min-width: 768px) {
    width: 27rem;
  }
`;

const ModalTitle = styled(Heading)<{ accept: boolean }>`
  position: relative;
  display: inline-block;
  &:after {
    content: '';
    height: 3px;
    position: absolute;
    bottom: -10px;
    width: 50%;
    z-index: 90;
    left: calc(28%);
    background-color: ${({ accept, theme }) =>
      `${accept ? theme.main.green : theme.main.red}`};
  }
`;

const InputLabel = styled.label`
  font-size: 18px;
  font-weight: 600;
  margin: 2rem 3rem;
`;

export default Manage;
