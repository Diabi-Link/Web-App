import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { useAppApolloClient } from './api/initializer';

import './i18n';
import theme from './theme';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';

import AppSelector from './Pages/AppSelector';
import LanguageSwitcher from './ui/LanguageSwitcher';

const App = (): JSX.Element => {
  const client = useAppApolloClient();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <UserProvider>
            <Router>
              <AppSelector />
              <LanguageSwitcher />
            </Router>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
