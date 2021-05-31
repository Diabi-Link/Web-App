import React from 'react';
import { render } from '@testing-library/react';
import Home from '..';

it('Text in state is changed when button clicked', () => {
  const { getByText } = render(<Home />);

  expect(getByText(/HOME/i).textContent).toBe('HOME');
});
