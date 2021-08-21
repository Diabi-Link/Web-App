import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';
import AppSelector from '../AppSelector';
import { UserProvider } from '../../contexts/UserContext';
import { AuthContext } from '../../contexts/AuthContext';
import { UserType } from '../../types/user';
import theme from '../../theme';

const mockUser: UserType = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@gamil.com',
  birthDate: new Date(),
  account: 'patient',
};

test('Auth App rendering/navigating', async () => {
  // render(
  //   <BrowserRouter>
  //     <ThemeProvider theme={theme}>
  //       <AuthContext.Provider value={{ user: mockUser }}>
  //         <UserProvider>
  //           <AppSelector />
  //         </UserProvider>
  //       </AuthContext.Provider>
  //     </ThemeProvider>
  //   </BrowserRouter>,
  // );
  // await waitFor(() =>
  //   expect(screen.getByText(/authentifié/i)).toBeInTheDocument(),
  // );
  // userEvent.click(screen.getByTestId('logout-button'));
  // await waitFor(() => expect(screen.getByText(/HOME/i)).toBeInTheDocument());
});
