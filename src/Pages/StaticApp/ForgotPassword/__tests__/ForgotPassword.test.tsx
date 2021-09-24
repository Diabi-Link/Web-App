import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import theme from '../../../../theme';

import ForgotPassword from '..';
import i18n from '../../../../i18n';
import en from '../../../../locales/en.json';

test('Test forgot password worflow', async () => {
  window.history.pushState({}, 'Test page', '/forgot-password/reset');
  render(
    <MockedProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <ForgotPassword />
          </I18nextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </MockedProvider>,
  );
  await waitFor(() =>
    expect(screen.getByText(en.ResetPassword.Title)).toBeInTheDocument(),
  );
  userEvent.type(screen.getByTestId('code-input'), '1234');
  userEvent.type(screen.getByTestId('password-input'), 'test1234');
  userEvent.type(screen.getByTestId('confirmPassword-input'), 'test1234');
  userEvent.click(screen.getByTestId('reset-button'));
  await waitFor(() =>
    expect(screen.getByText(en.ResetPassword.Title)).toBeInTheDocument(),
  );
});
