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

test('Inspecting add measurement page', async () => {
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
    expect(screen.getByTestId('auth-home-page')).toBeInTheDocument(),
  );
  userEvent.click(screen.getByTestId('add-measurement-navigation-button'));
  await waitFor(() =>
    expect(screen.getByTestId('auth-add-measurement-page')).toBeInTheDocument(),
  );
  userEvent.type(screen.getByTestId('bloodSugarLevels-input'), '1.0');
  screen.getByTestId('bloodSugarLevels-input').blur();
  userEvent.type(screen.getByTestId('bloodSugarLevels-input'), '3');
  screen.getByTestId('bloodSugarLevels-input').blur();
  userEvent.type(screen.getByTestId('bloodSugarLevels-input'), '0.4');
  screen.getByTestId('bloodSugarLevels-input').blur();
  userEvent.type(screen.getByTestId('bloodSugarLevels-input'), 'a');
  screen.getByTestId('bloodSugarLevels-input').blur();
  userEvent.type(screen.getByTestId('bloodSugarLevels-input'), '122');
  screen.getByTestId('bloodSugarLevels-input').blur();
  userEvent.click(screen.getByTestId('measure-button'));
});

test('Inspecting analytics page', async () => {
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
    expect(screen.getByTestId('auth-home-page')).toBeInTheDocument(),
  );
  userEvent.click(screen.getByTestId('analytics-navigation-button'));
  await waitFor(() =>
    expect(screen.getByTestId('auth-analytics-page')).toBeInTheDocument(),
  );
  userEvent.click(screen.getByTestId('time-target-7'));
  userEvent.click(screen.getByTestId('time-target-14'));
  userEvent.click(screen.getByTestId('time-target-30'));
  userEvent.click(screen.getByTestId('hypo-7'));
  userEvent.click(screen.getByTestId('hypo-14'));
  userEvent.click(screen.getByTestId('hypo-30'));
  // await waitFor(() =>
  //   expect(screen.getByTestId('auth-home-page')).toBeInTheDocument(),
  // );
  // userEvent.click(screen.getByTestId('logout-button'));
  // await waitFor(() => expect(screen.getByTestId(/HOME/i)).toBeInTheDocument());
});
