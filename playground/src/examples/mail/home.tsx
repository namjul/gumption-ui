import * as React from 'react';
import { Layout } from './layout';
import { HeaderBar } from './headerBar';
import { Content } from './content';

export const Home = () => (
    <Layout>
      <HeaderBar path="Mail" />
      <Content />I am HOME
    </Layout>
);
