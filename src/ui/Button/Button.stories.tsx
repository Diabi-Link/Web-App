import React from 'react'; // eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import Button, { ButtonTheme } from '.';

const primaryArgs = {
  label: 'Suivant',
  // eslint-disable-next-line no-console
  onClick: () => console.log('Click'),
  theme: 'primary' as ButtonTheme,
  outlined: false,
  lg: false,
};

storiesOf('Button', module).add('Primary', () => <Button {...primaryArgs} />);
