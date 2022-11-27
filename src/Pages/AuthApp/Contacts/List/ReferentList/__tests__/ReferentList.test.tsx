/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import { UserProvider } from '../../../../../../contexts/UserContext';
import { AuthContext } from '../../../../../../contexts/AuthContext';
import { UserType } from '../../../../../../types/user';
import theme from '../../../../../../theme';
import i18n from '../../../../../../i18n';
import ReferentList from '../index';

const mockUser: UserType = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@gmail.com',
  birthDate: new Date(),
  account: 'patient',
  isPaid: false,
  expire: null,
  ProductSub: null,
};

const contacts: UserType[] = [
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    birthDate: new Date(),
    account: 'referent',
    isPaid: false,
    expire: null,
    ProductSub: null,
  },
  {
    id: 3,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    birthDate: new Date(),
    account: 'medicalProfessional',
    isPaid: false,
    expire: null,
    ProductSub: null,
  },
];

const handleDelete = () => {
  console.log('hello');
};

test('Inspecting patient list', async () => {
  render(
    <MockedProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={{ user: mockUser }}>
            <UserProvider>
              <I18nextProvider i18n={i18n}>
                <ReferentList contacts={contacts} handleDelete={handleDelete} />
              </I18nextProvider>
            </UserProvider>
          </AuthContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </MockedProvider>,
  );
  await waitFor(() =>
    expect(
      screen.getByTestId('auth-contact-list-referent'),
    ).toBeInTheDocument(),
  );
});
