import * as React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { ThemeProvider } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies
import { theme } from './treat';
import { Layout } from './layout';
import { HeaderBar } from './headerBar';
import { Content } from './content';

export const Calendar = () => (
  <ThemeProvider theme={theme}>
    <Layout>
      <HeaderBar path="Calendar" />
      <Content />I am CALENDAR
    </Layout>
  </ThemeProvider>
);
