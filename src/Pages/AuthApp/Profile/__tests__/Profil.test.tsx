import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import AppSelector from '../../../AppSelector';
import { UserProvider } from '../../../../contexts/UserContext';
import { AuthContext } from '../../../../contexts/AuthContext';
import { UserType } from '../../../../types/user';
import theme from '../../../../theme';
import i18n from '../../../../i18n';

// import App from '../../../../App';
// import en from '../../../../locales/en.json';

const mockUser: UserType = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'test5@gmail.com',
  birthDate: new Date(),
  account: 'referent',
  isPaid: true,
  expire: null,
  ProductSub: null,
};

const mockUserUpdate: UserType = {
  id: 1,
  firstName: 'Nico',
  lastName: 'Carras',
  email: 'nico.carra@gmail.com',
  birthDate: new Date(),
  phone: '0686896745',
  account: 'referent',
  isPaid: true,
  expire: null,
  ProductSub: null,
};

test('Test update profile workflow', async () => {
  render(
    <MockedProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={{ user: mockUser }}>
            <UserProvider>
              <I18nextProvider i18n={i18n}>
                <AppSelector />
              </I18nextProvider>
            </UserProvider>
          </AuthContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </MockedProvider>,
  );
  await waitFor(() =>
    expect(screen.getByTestId('auth-analytics-page')).toBeInTheDocument(),
  );
  userEvent.click(screen.getByTestId('profile-navigation-button'));
  await waitFor(() =>
    expect(screen.getByTestId('profile-page')).toBeInTheDocument(),
  );
  userEvent.type(
    screen.getByTestId('firstName-input'),
    mockUserUpdate.firstName,
  );
  userEvent.type(screen.getByTestId('lastName-input'), mockUserUpdate.lastName);
  userEvent.type(screen.getByTestId('email-input'), mockUserUpdate.email);
  userEvent.type(screen.getByTestId('phone-input'), mockUserUpdate.phone || '');
  userEvent.type(screen.getByTestId('newPassword-input'), 'test1234');
  userEvent.type(screen.getByTestId('confirmPassword-input'), 'test1234');
  userEvent.click(screen.getByTestId('save-button'));
});

// Uncommment when working on profile page

// test('Test update profile workflow', async () => {
//   render(<App />);

//   await waitFor(() => expect(screen.getByTestId(/HOME/i)).toBeInTheDocument());
//   userEvent.click(screen.getByText(en.StaticNav.Login));
//   await waitFor(() =>
//     expect(screen.getByText(en.Login.FrameDesc)).toBeInTheDocument(),
//   );
//   userEvent.type(screen.getByTestId('email-login'), mockUser.email);
//   userEvent.type(screen.getByTestId('password-login'), 'test1234');
//   userEvent.click(screen.getByTestId('button-login'));

//   await waitFor(() =>
//     expect(screen.getByTestId('auth-analytics-page')).toBeInTheDocument(),
//   );
//   userEvent.click(screen.getByTestId('profile-navigation-button'));
//   await waitFor(() =>
//     expect(screen.getByTestId('profile-page')).toBeInTheDocument(),
//   );
//   userEvent.type(
//     screen.getByTestId('firstName-input'),
//     mockUserUpdate.firstName,
//   );
//   userEvent.type(screen.getByTestId('lastName-input'), mockUserUpdate.lastName);
//   userEvent.type(screen.getByTestId('email-input'), mockUserUpdate.email);
//   userEvent.type(screen.getByTestId('phone-input'), mockUserUpdate.phone || '');
//   userEvent.click(screen.getByTestId('save-button'));
//   await waitFor(() =>
//     expect(screen.getByPlaceholderText('Nico')).toBeInTheDocument(),
//   );
// });
