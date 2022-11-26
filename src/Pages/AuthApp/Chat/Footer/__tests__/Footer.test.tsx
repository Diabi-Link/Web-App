import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import { UserProvider } from '../../../../../contexts/UserContext';
import { AuthContext } from '../../../../../contexts/AuthContext';
import { UserType } from '../../../../../types/user';
import theme from '../../../../../theme';
import i18n from '../../../../../i18n';
import Footer from '..';

const mockUser: UserType = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@gmail.com',
  birthDate: new Date(),
  account: 'patient',
  isPaid: false,
  expireSubDate: null,
};

test('Inspecting Footer', async () => {
  render(
    <MockedProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={{ user: mockUser }}>
            <UserProvider>
              <I18nextProvider i18n={i18n}>
                <Footer addMessage={() => Promise.resolve()} />
              </I18nextProvider>
            </UserProvider>
          </AuthContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </MockedProvider>,
  );
  await waitFor(() =>
    expect(screen.getByTestId('footer-chat')).toBeInTheDocument(),
  );
  userEvent.type(screen.getByTestId('input'), 'Salut');
  userEvent.click(screen.getByTestId('btn'));
  userEvent.type(screen.getByTestId('input'), 'Test numero 2');
  userEvent.click(screen.getByTestId('btn'));
  userEvent.type(screen.getByTestId('input'), 'Dernier message');
  userEvent.click(screen.getByTestId('btn'));
});
