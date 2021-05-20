import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { useApolloClient } from './api';
import Nav from './Pages/UnauthApp/Nav';
import theme from './theme';
import { UserProvider } from './contexts/UserContext';

const App = (): JSX.Element => {
  const client = useApolloClient();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Router>
            <Nav />
          </Router>
        </UserProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
