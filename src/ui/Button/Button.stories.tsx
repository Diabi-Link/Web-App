import React from 'react'; // eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Button, { ButtonTheme } from '.';
import theme from '../../theme';

const primaryArgs = {
  label: 'Suivant',
  // eslint-disable-next-line no-console
  onClick: () => console.log('Click'),
  btnStyle: 'primary' as ButtonTheme,
};

const defaultArgs = {
  label: 'Suivant',
  // eslint-disable-next-line no-console
  onClick: () => console.log('Click'),
  btnStyle: 'default' as ButtonTheme,
};

storiesOf('Button', module)
  .add('Primary', () => (
    <ThemeProvider theme={theme}>
      <Button {...primaryArgs} />
    </ThemeProvider>
  ))
  .add('Default', () => (
    <ThemeProvider theme={theme}>
      <Button {...defaultArgs} />
    </ThemeProvider>
  ))
  .add('Disabled primary', () => (
    <ThemeProvider theme={theme}>
      <Button {...primaryArgs} disabled />
    </ThemeProvider>
  ));
