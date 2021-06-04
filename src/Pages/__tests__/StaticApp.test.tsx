import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import App from '../../App';

test('Static App rendering/navigating', async () => {
  render(<App />);

  await waitFor(() => expect(screen.getByText(/HOME/i)).toBeInTheDocument());

  userEvent.click(screen.getByText(/S'inscrire/i));

  await waitFor(() =>
    expect(
      screen.getByText(/Vous souhaitez nous rejoindre/i),
    ).toBeInTheDocument(),
  );

  userEvent.click(screen.getByText(/Revenir au site/i));

  await waitFor(() => expect(screen.getByText(/HOME/i)).toBeInTheDocument());

  userEvent.click(screen.getByText(/Se connecter/i));

  await waitFor(() =>
    expect(screen.getByText(/Content de vous revoir/i)).toBeInTheDocument(),
  );

  userEvent.click(screen.getByText(/Revenir au site/i));

  await waitFor(() => expect(screen.getByText(/HOME/i)).toBeInTheDocument());
});

test('landing on a bad page', () => {
  window.history.pushState({}, 'Test page', '/bad-route');
  render(<App />);

  expect(screen.getByText(/perdu/i)).toBeInTheDocument();
});
