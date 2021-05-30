import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { useAppApolloClient } from './api';

import theme from './theme';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';

import AppSelector from './Pages/AppSelector';

const App = (): JSX.Element => {
  const client = useAppApolloClient();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <UserProvider>
            <Router>
              <AppSelector />
            </Router>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
