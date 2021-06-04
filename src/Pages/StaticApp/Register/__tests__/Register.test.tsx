import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';
import theme from '../../../../theme';

import { RegisterProvider } from '../../../../contexts/RegisterContext';
import Register from '..';
import { UserType } from '../../../../types/user';

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
  window.history.pushState({}, 'Test page', '/register');
  render(
    <MockedProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <RegisterProvider>
            <Register />
          </RegisterProvider>
        </ThemeProvider>
      </BrowserRouter>
    </MockedProvider>,
  );

  await waitFor(() =>
    expect(
      screen.getByText(/Vous souhaitez nous rejoindre/i),
    ).toBeInTheDocument(),
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
    expect(
      screen.getByText(/Choisissez votre type de compte/i),
    ).toBeInTheDocument(),
  );

  userEvent.type(
    screen.getByTestId('medicalProfessional-box'),
    mockUser.firstName,
  );
  userEvent.type(screen.getByTestId('patient-box'), mockUser.firstName);
  userEvent.type(screen.getByTestId('referent-box'), mockUser.firstName);
  userEvent.click(screen.getByTestId('next-button'));

  await waitFor(() =>
    expect(screen.getByText(/Finalisons votre compte/i)).toBeInTheDocument(),
  );

  userEvent.type(screen.getByTestId('password-input'), 'test1234');
  userEvent.type(screen.getByTestId('confirmPassword-input'), 'test1234');
  userEvent.click(screen.getByTestId('next-button'));

  await waitFor(() =>
    expect(screen.getByText(/Finalisons votre compte/i)).toBeInTheDocument(),
  );
});

test('Test confirm email page', async () => {
  window.history.pushState({}, 'Test page', '/register/confirm');
  render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Register />
      </ThemeProvider>
    </BrowserRouter>,
  );

  await waitFor(() =>
    expect(screen.getByText(/Vérifiez votre email/i)).toBeInTheDocument(),
  );
});
