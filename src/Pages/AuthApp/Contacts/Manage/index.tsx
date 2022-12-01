import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';

import { Icon } from 'react-icons-kit';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';

import { ContactRequestType } from '../../../../types/contactRequest';

import Button from '../../../../ui/Button';
import { Heading } from '../../../../ui/Heading';
import {
  GetContactRequestsResponse,
  useAnswerContactRequest,
} from '../../../../api';
import Card from './Card';
import {
  ContextActionTypes,
  MainContext,
} from '../../../../contexts/MainContext';

type Props = {
  contactRequests: GetContactRequestsResponse | undefined;
  refetch: () => void;
};

const Manage = ({ contactRequests, refetch }: Props): JSX.Element => {
  const { push } = useHistory();
  const { t } = useTranslation();
  const { dispatch: altDispatch } = useContext(MainContext);
  const [
    selectedContactRequest,
    setSelectedContactRequest,
  ] = useState<ContactRequestType | null>(null);
  const [accept, setAccept] = useState<boolean>(false);

  const [answerContactRequest] = useAnswerContactRequest({
    onError: () => {
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: t('StaticNav.Error'),
          noticeStyle: 'red',
          persistent: false,
          closeable: true,
          duration: 5000,
        },
      });
    },
  });

  const handleChoice = useCallback(
    (choice: boolean, contactRequest: ContactRequestType) => {
      setSelectedContactRequest(contactRequest);
      setAccept(choice);
    },
    [],
  );

  return (
    <>
      <Container
        data-testid="auth-contacts-list-page"
        isOpen={selectedContactRequest !== null}
      >
        <PageTitle level={2}>{t('Contacts.Request')}</PageTitle>
        <ListContainer>
          <ListWrapper>
            <List>
              {contactRequests?.getContactRequests?.map((contactRequest) => (
                <Card
                  handleChoice={handleChoice}
                  contactRequest={contactRequest}
                  key={contactRequest.id}
                />
              ))}
            </List>
          </ListWrapper>
        </ListContainer>
        <ButtonWrapper>
          <BackLink to="/contacts/menu" data-testid="back-arrow">
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
      {selectedContactRequest !== null && (
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
              label={t('Contacts.Cancel')}
              btnStyle="default"
              outlined
              data-testid="decline-button"
              onClick={() => {
                setSelectedContactRequest(null);
              }}
            />
            <StyledButton
              type="submit"
              label={t('Contacts.Validate')}
              btnStyle="green"
              outlined
              data-testid="validate-button"
              onClick={() => {
                answerContactRequest({
                  variables: {
                    email: selectedContactRequest.email,
                    answer: accept,
                  },
                  onCompleted: () => {
                    refetch();
                    altDispatch({
                      type: ContextActionTypes.SetNotice,
                      payload: {
                        label: accept
                          ? t('Contacts.AddSuccess')
                          : t('Contacts.RemoveRequest'),
                        noticeStyle: accept ? 'green' : 'red',
                        persistent: false,
                        closeable: true,
                        duration: 5000,
                      },
                    });
                  },
                });
                setSelectedContactRequest(null);
              }}
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
