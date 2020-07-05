import * as React from 'react';
import { Layout } from './layout';
import { HeaderBar } from './headerBar';
import { Content } from './content';

type Props = {
  folder: string;
};

export const Home = ({ folder }: Props) => (
  <Layout>
    <HeaderBar path="Mail" />
    <Content folder={folder} />
  </Layout>
);
