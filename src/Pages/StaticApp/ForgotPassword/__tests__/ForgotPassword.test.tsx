import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';
import theme from '../../../../theme';

import { RegisterProvider } from '../../../../contexts/RegisterContext';
import ForgotPassword from '..';

test('Test forgot password worflow', async () => {
  window.history.pushState({}, 'Test page', '/forgot-password/reset');
  render(
    <MockedProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <RegisterProvider>
            <ForgotPassword />
          </RegisterProvider>
        </ThemeProvider>
      </BrowserRouter>
    </MockedProvider>,
  );

  await waitFor(() =>
    expect(
      screen.getByText(/Réinitialisez votre mot de passe/i),
    ).toBeInTheDocument(),
  );

  userEvent.type(screen.getByTestId('code-input'), '1234');
  userEvent.type(screen.getByTestId('password-input'), 'test1234');
  userEvent.type(screen.getByTestId('confirmPassword-input'), 'test1234');
  userEvent.click(screen.getByTestId('reset-button'));

  await waitFor(() =>
    expect(
      screen.getByText(/Réinitialisez votre mot de passe/i),
    ).toBeInTheDocument(),
  );
});
