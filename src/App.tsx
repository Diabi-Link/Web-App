import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { useAppApolloClient } from './api/initializer';

import './i18n';
import theme from './theme';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { MainProvider } from './contexts/MainContext';

import AppSelector from './Pages/AppSelector';
import LanguageSwitcher from './ui/LanguageSwitcher';
import Notice from './ui/Notice';

const App = (): JSX.Element => {
  const client = useAppApolloClient();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <MainProvider>
          <AuthProvider>
            <UserProvider>
              <Router>
                <AppSelector />
                <LanguageSwitcher />
                <Notice />
              </Router>
            </UserProvider>
          </AuthProvider>
        </MainProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
