import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import { DocumentData } from 'firebase/firestore';
import { UserProvider } from '../../../../../contexts/UserContext';
import { AuthContext } from '../../../../../contexts/AuthContext';
import { UserType } from '../../../../../types/user';
import theme from '../../../../../theme';
import i18n from '../../../../../i18n';
import Discussion from '..';

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

const discussion: DocumentData[] = [
  {
    userId: 1,
    sendAt: new Date().getTime(),
    text: 'Salut',
  },
];

test('Inspecting Discussion', async () => {
  render(
    <MockedProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={{ user: mockUser }}>
            <UserProvider>
              <I18nextProvider i18n={i18n}>
                <Discussion messages={discussion} userId={mockUser.id} />
              </I18nextProvider>
            </UserProvider>
          </AuthContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </MockedProvider>,
  );
  await waitFor(() =>
    expect(screen.getByTestId('discussion-chat')).toBeInTheDocument(),
  );
});
