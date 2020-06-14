import * as React from 'react';
import { quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies

const Quark = quark('div');

export const Sidebar = () => (
  <Quark
    css={{ backgroundColor: 'blue', width: '200px', display: 'inline-block' }}
  >
    I am Sidebar
  </Quark>
);
