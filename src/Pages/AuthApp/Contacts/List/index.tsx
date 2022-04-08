import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';

import { Icon } from 'react-icons-kit';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';

import { UserContext } from '../../../../contexts/UserContext';
import { useGetContact } from '../../../../api';

import Button from '../../../../ui/Button';
import Loader from '../../../../ui/Loader';

import PatientList from './PatientList';
import ReferentList from './ReferentList';

const List = (): JSX.Element => {
  const {
    state: { user },
  } = useContext(UserContext);
  const { push } = useHistory();
  const { t } = useTranslation();

  const { data, loading } = useGetContact();

  if (loading) {
    return <Loader loaderStyle="white" />;
  }

  return (
    <Container>
      <ListWrapper>
        {user?.account === 'patient' ? (
          <ReferentList contacts={data?.Me.contact} />
        ) : (
          <PatientList contacts={data?.Me.contact} />
        )}
      </ListWrapper>
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

const ListWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-self: flex-end;
  height: 70%;
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

export default List;
