import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';

import { Icon } from 'react-icons-kit';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';

import {
  ContextActionTypes,
  MainContext,
} from '../../../../contexts/MainContext';
import { UserContext } from '../../../../contexts/UserContext';
import { useGetContact, useDeleteContact } from '../../../../api';

import { ReactComponent as ProfilePatient } from '../../../../assets/svgs/ProfilePatient.svg';

import Button from '../../../../ui/Button';
import Loader from '../../../../ui/Loader';
import { Heading } from '../../../../ui/Heading';

import PatientList from './PatientList';
import ReferentList from './ReferentList';

const Manage = (): JSX.Element => {
  const {
    state: { user },
  } = useContext(UserContext);
  const { dispatch: altDispatch } = useContext(MainContext);
  const { push } = useHistory();
  const { t } = useTranslation();

  const [deleteContact] = useDeleteContact({
    onCompleted: () => {
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: 'Vous avez supprimer un utilisateur avec succès',
          noticeStyle: 'green',
          persistent: false,
          closeable: true,
          duration: 5000,
        },
      });
      push('/contacts/menu');
    },
    onError: () => {
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: 'Une erreur est survenu lors de la suppression',
          noticeStyle: 'red',
          persistent: false,
          closeable: true,
          duration: 5000,
        },
      });
    },
  });

  const { data, loading, refetch } = useGetContact({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Loader loaderStyle="white" />;
  }

  const handleDelete = async (id: number) => {
    await deleteContact({
      variables: {
        id: [{ id: parseFloat(id.toString()) }],
      },
    });
    refetch();
  };

  return (
    <Container data-testid="auth-contacts-list-page">
      <ListContainer>
        <ListWrapper>
          <List>
            <StyledBox>
              <AvatarWrapper>
                <ProfilePatient />
              </AvatarWrapper>
              <InfoWrapper>
                <Heading level={2}>Mathis Paroissien</Heading>
                <OptionalInfo>
                  <Mail level={3}>Mail : mathis@test.fr</Mail>
                </OptionalInfo>
              </InfoWrapper>
              <StyledButton
                type="submit"
                data-testid="trash-button"
                label={t('Contacts.Accept')}
                btnStyle="primary"
                onClick={() => handleDelete(1)}
              >
                {/* <Icon icon={trash} size={20} /> */}
              </StyledButton>
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
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 80vw;
  justify-content: flex-start;
  align-items: center;
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

  @media (min-width: 1024px) {
    width: 80%;
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ theme }) => `2px solid ${theme.main.primaryLight}`};
  background-color: ${(props) => props.theme.main.primaryLighter};
  width: 4rem;
  height: 4rem;
  border-radius: 15px;

  & > svg {
    height: 90%;
  }
`;

const StyledButton = styled(Button)`
  // margin-top: 2rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 50%;

  & > h2 {
    font-size: 0.7rem;
    font-weight: 600;

    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }

  & > div > h3 {
    font-size: 0.6rem;
    font-weight: 400;

    @media (min-width: 768px) {
      font-size: 0.8rem;
    }
  }

  @media (orientation: portrait) {
    width: 50%;
  }
`;

const OptionalInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;

  @media (min-width: 1300px) and (orientation: landscape) {
    width: 60%;
    justify-content: space-between;
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

export default Manage;
