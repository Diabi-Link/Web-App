import React from 'react';
import styled from 'styled-components';
import { avatars } from '../../../../utils/avatars';
import { UserType } from '../../../../types/user';

type Props = Pick<UserType, 'firstName' | 'lastName' | 'account'>;

const Header = ({
  firstName,
  lastName,
  account,
}: Props): React.ReactElement => {
  return (
    <Container>
      <AvatarWrapper>{avatars[account].svg}</AvatarWrapper>
      <NameWrapper>
        <Text>
          {firstName} {lastName}
        </Text>
      </NameWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  background-color: white;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);
`;

const NameWrapper = styled.div`
  margin-left: 10px;
`;

const Text = styled.p`
  font-weight: 500;
  font-size: 20px;
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.main.primaryLight};
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-left: 10px;
`;

export default Header;
