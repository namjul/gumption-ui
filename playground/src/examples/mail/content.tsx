import * as React from 'react';
import { quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies
import { Sidebar } from './sidebar';
import { Main } from './main';

const Quark = quark('div');

export const Content = () => (
  <Quark css={{ height: '200px', display: 'flex' }}>
    <Sidebar />
    <Main />
  </Quark>
);