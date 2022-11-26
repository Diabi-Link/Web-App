import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import AppSelector from '../../AppSelector';
import { UserProvider } from '../../../contexts/UserContext';
import { AuthContext } from '../../../contexts/AuthContext';
import { UserType } from '../../../types/user';
import theme from '../../../theme';
import i18n from '../../../i18n';
import { DeviceContext } from '../../../contexts/DeviceContext';

const mockUser: UserType = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@gamil.com',
  birthDate: new Date(),
  account: 'patient',
  isPaid: false,
  expireSubDate: null,
};

test('Auth App rendering/navigating drawer menu', async () => {
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
  userEvent.click(screen.getByTestId('analytics-navigation-button'));
  await waitFor(() =>
    expect(screen.getByTestId('auth-analytics-page')).toBeInTheDocument(),
  );
});

test('Auth App rendering/navigating hamburger menu', async () => {
  render(
    <MockedProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={{ user: mockUser }}>
            <UserProvider>
              <DeviceContext.Provider value={{ isMobileOrTablet: true }}>
                <I18nextProvider i18n={i18n}>
                  <AppSelector />
                </I18nextProvider>
              </DeviceContext.Provider>
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
  userEvent.click(screen.getByTestId('analytics-navigation-button'));
  await waitFor(() =>
    expect(screen.getByTestId('auth-analytics-page')).toBeInTheDocument(),
  );
});
