import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { search } from 'react-icons-kit/fa/search';
import { useTranslation } from 'react-i18next';
import Icon from 'react-icons-kit';
import { eye } from 'react-icons-kit/icomoon/eye';
import Input from '../../../../ui/Input';
import Heading from '../../../../ui/Heading';
import { UserType } from '../../../../types/user';
import profilPatient from '../../../../assets/svgs/ProfilePatient.svg';

const PatientChoice = ({
  contacts,
  setUserAnalytics,
}: {
  contacts: UserType[] | undefined;
  setUserAnalytics: React.Dispatch<React.SetStateAction<UserType | undefined>>;
}) => {
  const [value, setValue] = useState('');
  const invisibles = useRef<number[]>([]);
  const { t } = useTranslation();

  const searchContact = ({
    target: { value: newValue },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (newValue !== '') {
      const newContactsIdx: number[] = [];

      contacts?.forEach((contact, idx) => {
        if (
          contact.firstName
            .toLocaleLowerCase()
            .match(newValue.toLocaleLowerCase()) === null &&
          contact.lastName
            .toLocaleLowerCase()
            .match(newValue.toLocaleLowerCase()) === null
        ) {
          newContactsIdx.push(idx);
        }
      });
      invisibles.current = newContactsIdx;
    } else {
      invisibles.current = [];
    }
    setValue(newValue);
  };

  return (
    <Container>
      <Wrapper>
        <PageTitle level={1}>Choix du patient</PageTitle>
        <InputWrapper>
          <StyledInput
            name="search"
            type="text"
            value={value}
            onChange={searchContact}
            placeholder="Rechercher dans mes patients..."
            icon={search}
          />
        </InputWrapper>
        {/* <SelectorWrapper>
          <Text type="regular">Trier par :</Text>
          <Text
            type={selected === 'name' ? 'selected' : 'unselected'}
            onClick={() => setSelected('name')}
          >
            Nom
          </Text>
          <Text type="regular">-</Text>
          <Text
            type={selected === 'hour' ? 'selected' : 'unselected'}
            onClick={() => setSelected('hour')}
          >
            Heure de scan
          </Text>
        </SelectorWrapper> */}
        <PatientTitle level={2}>{t('Contacts.Patient')}</PatientTitle>

        <ContactWrapper>
          {contacts?.map((c, idx) => (
            <StyledBox key={c.id} visible={!invisibles.current.includes(idx)}>
              <AvatarWrapper>
                <StyledImage src={profilPatient} alt="profilpatient" />
              </AvatarWrapper>
              <InfoWrapper>
                <Heading level={2}>{`${c.firstName} ${c.lastName}`}</Heading>
                <OptionalInfo>
                  <Mail level={3}>({c.email})</Mail>
                </OptionalInfo>
                <Visualize level={3} onClick={() => setUserAnalytics(c)}>
                  Visualiser les données
                  <StyledIcon icon={eye} size={15} />
                </Visualize>
              </InfoWrapper>
            </StyledBox>
          ))}
        </ContactWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100vw;
  height: 100vh;

  @media (min-width: 1024px) and (orientation: landscape) {
    width: 85vw;
  }
`;

const PageTitle = styled(Heading)`
  position: relative;
  color: ${({ theme }) => theme.main.primaryLight};
  margin-top: 2rem;
  text-align: center;

  &:before,
  &:after {
    content: '';
    height: 10%;
    top: 50%;
    position: absolute;
  }

  &:before {
    background-color: ${({ theme }) => theme.main.whiteBroken};
    left: -1.5em;
    right: -1.5em;
    z-index: -1;
    height: 101%;
  }

  &:after {
    left: 50%;
    transform: translateX(-50%);
    width: 80vw;
    z-index: -2;
    background-color: ${({ theme }) => theme.main.primaryLight};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  @media (min-width: 768px) {
    margin-top: 40px;
  }
  width: 100%;
  background-color: ${({ theme }) => theme.main.whiteBroken};
`;

const StyledInput = styled(Input)`
  width: 80vw;
  @media (min-width: 768px) {
    width: 420px;
  }
`;

// const SelectorWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   margin-top: 20px;
// `;

// const Text = styled.p<{ type: 'regular' | 'selected' | 'unselected' }>`
//   margin-right: 10px;
//   color: ${({ type, theme }) => {
//     if (type === 'selected') return theme.main.primary;
//     if (type === 'unselected') return theme.main.gray;
//     return theme.main.dark;
//   }};
//   font-weight: ${({ type }) => (type === 'selected' ? 'bold' : 'normal')};
//   cursor: ${({ type }) => (type !== 'regular' ? 'pointer' : 'auto')};
// `;

const PatientTitle = styled(Heading)`
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
  width: auto;
  margin: 20px 0;
  @media (min-width: 768px) {
    width: 100%;
  }
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  @media (min-width: 768px) {
    padding: 0 60px;
  }
`;

const StyledBox = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  align-items: center;
  min-height: 6rem;
  width: 100%;
  border-radius: 10px;
  border: ${({ theme }) => `3px solid ${theme.main.primaryLighter}`};
  box-shadow: ${({ theme }) =>
    `0 0.063rem 0.17rem 0.033rem ${theme.main.grayLight}`};

  background-color: ${({ theme }) => theme.main.white};

  &:not(:last-of-type) {
    margin-bottom: 20px;
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
  margin-left: 20px;

  & > img {
    height: 90%;
  }
`;

const StyledImage = styled.img``;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  position: relative;
  width: 100%;

  & > h2 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 5px;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    & > h2 {
      margin: 0;
    }
  }

  h3 {
    font-size: 0.8rem;
  }
`;

const OptionalInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 1300px) and (orientation: landscape) {
    justify-content: space-between;
  }
`;

const Mail = styled(Heading)`
  @media (min-width: 768px) {
    margin: 0 0 0 10px !important;
  }
  margin: 0 0 7px 0;
  display: flex;
  font-weight: 400;
`;

const Visualize = styled(Heading)`
  margin: 0;
  display: flex;
  color: ${({ theme }) => theme.main.primary};
  cursor: pointer;
  font-weight: 600;
  @media (min-width: 768px) {
    position: absolute;
    right: 15px;
  }
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  margin-left: 5px;
`;

export default PatientChoice;
