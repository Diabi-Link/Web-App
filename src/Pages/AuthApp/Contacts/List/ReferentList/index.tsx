import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Icon } from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';
import { ReactComponent as ProfileMP } from '../../../../../assets/svgs/ProfileMP.svg';
import { ReactComponent as ProfileReferent } from '../../../../../assets/svgs/ProfileReferent.svg';

import { UserType } from '../../../../../types/user';

import Heading from '../../../../../ui/Heading';

type Props = {
  contacts: UserType[] | undefined;
  handleDelete: (id: number) => any;
};

const ReferentList = ({ contacts, handleDelete }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Container data-testid="auth-contact-list-referent">
      <Left>
        <PageTitle level={2}>{t('Contacts.MedicalPro')}</PageTitle>
        <ContactWrapper>
          {contacts
            ?.filter((c) => c.account === 'medicalProfessional')
            .map((c) => (
              <StyledBox>
                <AvatarWrapper>
                  <ProfileMP />
                </AvatarWrapper>
                <NameWrapper>
                  <Name level={2}>{`${c.firstName} ${c.lastName}`}</Name>
                  <Email level={3}>Mail : {c.email}</Email>
                </NameWrapper>
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
      </Left>
      <Right>
        <PageTitle level={2}>{t('Contacts.Referent')}</PageTitle>
        <ContactWrapper>
          {contacts
            ?.filter((c) => c.account === 'referent')
            .map((c) => (
              <StyledBox>
                <AvatarWrapper>
                  <ProfileReferent />
                </AvatarWrapper>
                <NameWrapper>
                  <Name level={2}>{`${c.firstName} ${c.lastName}`}</Name>
                  <Email level={3}>Mail : {c.email}</Email>
                </NameWrapper>
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
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;

  & > div > div > div {
    margin: 0.5rem 0;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 50%;
  width: 100%;

  & > h2 {
    width: 110%;
    @media (min-width: 1200px) and (orientation: landscape) {
      width: 65%;
    }
  }

  @media (min-width: 1200px) and (orientation: landscape) {
    height: 100%;
    width: 50%;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 50%;
  width: 100%;

  & > h2 {
    width: 100%;
    @media (min-width: 1200px) and (orientation: landscape) {
      width: 65%;
    }
  }

  @media (min-width: 1200px) and (orientation: landscape) {
    & > div {
      align-items: flex-end;
    }
    height: 100%;
    width: 50%;
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
  justify-content: space-evenly;
  min-height: 6rem;
  width: 100%;
  border-radius: 10px;
  border: ${({ theme }) => `3px solid ${theme.main.primaryLighter}`};
  box-shadow: ${({ theme }) =>
    `0 0.063rem 0.17rem 0.033rem ${theme.main.grayLight}`};

  background-color: ${({ theme }) => theme.main.white};

  @media (min-width: 1024px) {
    width: 65%;
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

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
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

const Name = styled(Heading)`
  font-size: 1rem;
  font-weight: 600;
`;

const Email = styled(Heading)`
  font-size: 0.8rem;
  font-weight: 400;
`;

export default ReferentList;
