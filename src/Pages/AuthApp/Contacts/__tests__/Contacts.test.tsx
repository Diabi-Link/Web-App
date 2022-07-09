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

const mockUser: UserType = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@gmail.com',
  birthDate: new Date(),
  account: 'patient',
};

const mockUserReferent: UserType = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@gmail.com',
  birthDate: new Date(),
  account: 'referent',
};

test('Inspecting contact page patient', async () => {
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
  userEvent.click(screen.getByTestId('contacts-navigation-button'));
  await waitFor(() =>
    expect(screen.getByTestId('auth-contacts-menu-page')).toBeInTheDocument(),
  );
  userEvent.click(screen.getByTestId('add-box'));
  await waitFor(() =>
    expect(screen.getByTestId('auth-contacts-add-page')).toBeInTheDocument(),
  );
  userEvent.click(screen.getByTestId('back-arrow'));
  await waitFor(() =>
    expect(screen.getByTestId('auth-contacts-menu-page')).toBeInTheDocument(),
  );
  userEvent.click(screen.getByTestId('list-box'));
  await waitFor(() =>
    expect(screen.getByTestId('auth-contacts-list-page')).toBeInTheDocument(),
  );
});

test('Inspecting contact page referent', async () => {
  render(
    <MockedProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={{ user: mockUserReferent }}>
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
    expect(screen.getByTestId('auth-contacts-list-page')).toBeInTheDocument(),
  );
});
