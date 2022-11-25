import { ErrorBoundary } from '@sentry/react';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';
import { useTranslation } from 'react-i18next';
import Icon from 'react-icons-kit';
import { useLocation } from 'react-router-dom';
import { Heading } from '../ui/Heading';

import { UserContext } from '../contexts/UserContext';

import AuthNav from './AuthApp/Navigation/Nav';
import StaticNav from './StaticApp/Nav';
import Link from '../ui/Link';

const AppSelector = (): React.ReactElement => {
  const {
    state: { user },
  } = useContext(UserContext);
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <ErrorBoundary
      key={location.pathname}
      fallback={
        <Container>
          <BugWrapper>🐛</BugWrapper>
          <StyledHeading level={1}>
            Oups, une erreur inattendue est survenue.
          </StyledHeading>
          <Link to="/" $linkStyle="primary" $bold>
            <StyledIcon icon={arrowLeft2} size={20} />
            {t('404.Back')}
          </Link>
        </Container>
      }
    >
      {user ? <AuthNav /> : <StaticNav />}
    </ErrorBoundary>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BugWrapper = styled.div`
  font-size: 50px;
`;

const StyledIcon = styled(Icon)`
  margin-right: 0.3rem;
`;

const StyledHeading = styled(Heading)`
  text-align: center;
`;
export default AppSelector;
