import React from 'react'; // eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Loader from '.';
import theme from '../../theme';

storiesOf('Loader', module)
  .add('Default', () => (
    <ThemeProvider theme={theme}>
      <Loader size={8} />
    </ThemeProvider>
  ))
  .add('Primary', () => (
    <ThemeProvider theme={theme}>
      <Loader size={14} loaderStyle="primary" />
    </ThemeProvider>
  ));
