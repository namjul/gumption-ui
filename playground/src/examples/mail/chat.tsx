import * as React from 'react';
import { ThemeProvider } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies
import { theme } from './treat';
import { Layout } from './layout';
import { HeaderBar } from './headerBar';
import { Content } from './content';

export const Chat = () => (
  <ThemeProvider theme={theme}>
    <Layout>
      <HeaderBar path="Chat" />
      <Content />I am CHAT
    </Layout>
  </ThemeProvider>
);
