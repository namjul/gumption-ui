import * as React from 'react';
import { quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies

const Quark = quark('div');

export const Main = () => (
  <Quark
    css={{
      backgroundColor: 'turquoise',
      display: 'inline-block',
      width: '500px',
    }}
  >
    I am Main
  </Quark>
);
