import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import { AuthContext } from '../../../contexts/AuthContext';
import { UserProvider } from '../../../contexts/UserContext';
import { DeviceContext } from '../../../contexts/DeviceContext';
import i18n from '../../../i18n';
import AppSelector from '../../AppSelector';
import theme from '../../../theme';
import en from '../../../locales/en.json';
import App from '../../../App';

test('Static App rendering/navigating', async () => {
  render(<App />);
  await waitFor(() =>
    expect(screen.getByTestId('static-home-page')).toBeInTheDocument(),
  );
  userEvent.click(screen.getByText(en.StaticNav.Register));
  await waitFor(() =>
    expect(screen.getByText(en.Register.User.Title)).toBeInTheDocument(),
  );
  userEvent.click(screen.getByText(en.Link.BackSite));
  await waitFor(() =>
    expect(screen.getByTestId('static-home-page')).toBeInTheDocument(),
  );
  userEvent.click(screen.getByText(en.StaticNav.Login));
  await waitFor(() =>
    expect(screen.getByText(en.Login.FrameDesc)).toBeInTheDocument(),
  );
  userEvent.click(screen.getByText(en.Login.ForgotPassword));
  await waitFor(() =>
    expect(screen.getByText(en.Login.ForgotPassword)).toBeInTheDocument(),
  );
  userEvent.type(
    screen.getByPlaceholderText(/John.cena@gmail.com/i),
    'test@test.com',
  );
  userEvent.click(screen.getByTestId('reset-button'));
});

test('landing on a bad page', () => {
  window.history.pushState({}, 'Test page', '/bad-route');
  render(<App />);
  expect(screen.getByText(en[404].Title)).toBeInTheDocument();
});
