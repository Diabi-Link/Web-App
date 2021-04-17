import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Nav from './Pages/Nav';
import theme from './theme';

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Nav />
      </Router>
    </ThemeProvider>
  );
};

export default App;
