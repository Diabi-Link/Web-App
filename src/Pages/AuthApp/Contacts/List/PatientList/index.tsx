import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Icon } from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';
import { ReactComponent as ProfilePatient } from '../../../../../assets/svgs/ProfilePatient.svg';

import { UserType } from '../../../../../types/user';

import Heading from '../../../../../ui/Heading';

type Props = {
  contacts: UserType[] | undefined;
  handleDelete: (id: number) => any;
};

const PatientList = ({ contacts, handleDelete }: Props): JSX.Element => {
  const { t } = useTranslation();

  const getYear = (date: Date) => {
    const i = new Date(date);

    const z = new Date(Date.now() - i.getTime());

    const age = Math.abs(z.getUTCFullYear() - 1970);

    return age;
  };

  return (
    <Container data-testid="auth-contact-list-patient">
      <PageTitle level={2}>{t('Contacts.Patient')}</PageTitle>
      <ContactWrapper>
        {contacts
          ?.filter((c) => c.account === 'patient')
          .map((c) => (
            <StyledBox>
              <AvatarWrapper>
                <ProfilePatient />
              </AvatarWrapper>
              <InfoWrapper>
                <Heading level={2}>{`${c.firstName} ${c.lastName}`}</Heading>
                <OptionalInfo>
                  <Mail level={3}>Mail : {c.email}</Mail>
                  <Heading level={3}>Age : {getYear(c.birthDate)}</Heading>
                </OptionalInfo>
              </InfoWrapper>
              <IconWrapper
                type="submit"
                data-testid="trash-button"
                onClick={() => handleDelete(c.id)}
              >
                <Icon icon={trash} size={20} />
              </IconWrapper>
            </StyledBox>
          ))}
      </ContactWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;

  & > div > div {
    margin: 0.5rem 0;
  }
`;

const ContactWrapper = styled.div`
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

const IconWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ theme }) => `2px solid ${theme.main.primaryLight}`};
  background-color: ${(props) => props.theme.main.primaryLighter};
  width: 2rem;
  height: 2rem;
  border-radius: 10px;
  cursor: pointer;

  @media (min-width: 1500px) {
    width: 2.5rem;
    height: 2.5rem;
  }
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

const PageTitle = styled(Heading)`
  position: relative;
  color: ${({ theme }) => theme.main.primaryLight};
  padding: 1rem 4rem;
  margin: 0;
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

export default PatientList;
