import * as React from 'react';
import { quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies

const Quark = quark('div');

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <Quark
    css={{
      backgroundColor: '#f6f7fb',
      margin: 'large',
      fontFamily: 'work-Sans,sans-serif;',
      paddingX: 'large',
    }}
  >
    {children}
  </Quark>
);
