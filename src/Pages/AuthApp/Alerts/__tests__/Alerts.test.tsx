/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import { UserProvider } from '../../../../contexts/UserContext';
import { AuthContext } from '../../../../contexts/AuthContext';
import { UserType } from '../../../../types/user';
import theme from '../../../../theme';
import i18n from '../../../../i18n';
import Alerts from '..';

const mockUser: UserType = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@gmail.com',
  birthDate: new Date(),
  account: 'referent',
  isPaid: false,
  expire: null,
  ProductSub: null,
};

test('Inspecting alerts page', async () => {
  render(
    <MockedProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={{ user: mockUser }}>
            <UserProvider>
              <I18nextProvider i18n={i18n}>
                <Alerts />
              </I18nextProvider>
            </UserProvider>
          </AuthContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </MockedProvider>,
  );
  await waitFor(() =>
    expect(screen.getByTestId('auth-alert-page')).toBeInTheDocument(),
  );
  userEvent.click(screen.getByTestId('auth-alert-btn1'));
  userEvent.click(screen.getByTestId('auth-alert-btn2'));
  userEvent.click(screen.getByTestId('auth-alert-btn3'));
  userEvent.click(screen.getByTestId('auth-alert-btn4'));
  await waitFor(() =>
    expect(screen.getByTestId('auth-alert-page')).toBeInTheDocument(),
  );
  userEvent.click(screen.getByTestId('flag-0'));
  userEvent.click(screen.getByTestId('flag-1'));
  userEvent.click(screen.getByTestId('flag-2'));
  userEvent.click(screen.getByTestId('flag-3'));
  await waitFor(() =>
    expect(screen.getByTestId('auth-alert-page')).toBeInTheDocument(),
  );
});
