import * as React from 'react';
import { Layout } from './layout';
import { HeaderBar } from './headerBar';
import { Content } from './content';

export const Chat = () => (
    <Layout>
      <HeaderBar path="Chat" />
      <Content />
    </Layout>
);
