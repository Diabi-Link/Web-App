/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { I18nextProvider } from 'react-i18next';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';
import theme from '../../../../theme';

import { RegisterProvider } from '../../../../contexts/RegisterContext';
import Register from '..';
import { UserType } from '../../../../types/user';
import i18n from '../../../../i18n';
import en from '../../../../locales/en.json';

const date = new Date();

const mockUser: UserType = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@gmail.com',
  birthDate: new Date(date.getFullYear(), date.getMonth(), 1),
  account: 'referent',
};

test('Test register worflow', async () => {
  window.history.pushState({}, 'Test page', '/register/user');
  render(
    <MockedProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <RegisterProvider>
              <Register />
            </RegisterProvider>
          </I18nextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </MockedProvider>,
  );
  await waitFor(() =>
    expect(screen.getByText(en.Register.User.Title)).toBeInTheDocument(),
  );
  userEvent.type(screen.getByTestId('firstName-input'), mockUser.firstName);
  userEvent.type(screen.getByTestId('lastName-input'), mockUser.lastName);
  userEvent.type(screen.getByTestId('email-input'), mockUser.email);
  userEvent.click(screen.getByTestId('birthDate-input'));
  userEvent.click(
    document.getElementsByClassName('react-datepicker__day--001')[0],
  );
  userEvent.click(screen.getByTestId('next-button'));
  await waitFor(() =>
    expect(screen.getByText(en.Register.Account.Title)).toBeInTheDocument(),
  );
  userEvent.click(screen.getByTestId('medicalProfessional-box'));
  userEvent.click(screen.getByTestId('patient-box'));
  userEvent.click(screen.getByTestId('referent-box'));
  userEvent.click(screen.getByTestId('next-button'));
  await waitFor(() =>
    expect(screen.getByText(en.Register.Security.Title)).toBeInTheDocument(),
  );
  userEvent.type(screen.getByTestId('password-input'), 'test1234');
  userEvent.type(screen.getByTestId('confirmPassword-input'), 'test1234');
  userEvent.click(screen.getByTestId('next-button'));
  await waitFor(() =>
    expect(screen.getByText(en.Register.Security.Title)).toBeInTheDocument(),
  );
});
test('Test confirm email page', async () => {
  window.history.pushState({}, 'Test page', '/register/confirm');
  render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <Register />
        </I18nextProvider>
      </ThemeProvider>
    </BrowserRouter>,
  );
  await waitFor(() =>
    expect(screen.getByText(en.Register.Confirm.Title)).toBeInTheDocument(),
  );
});
