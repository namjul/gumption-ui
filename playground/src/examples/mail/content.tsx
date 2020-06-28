import * as React from 'react';
import { quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies
import { Sidebar } from './SideBar/sidebar';
import { Main } from './Main/main';

const Quark = quark('div');

type Props = {
  folder: string;
};

export const Content = ({ folder }: Props) => (
  <Quark css={{ height: '800px', display: 'flex', paddingBottom: 'large' }}>
    <Sidebar />
    <Main folder={folder} />
  </Quark>
);
