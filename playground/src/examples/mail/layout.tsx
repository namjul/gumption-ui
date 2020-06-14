import * as React from 'react';
import type { Node } from 'react';
import { quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies

const Quark = quark('div');

export const Layout = ({ children }: { children: React.Node }) => (
  <Quark css={{ backgroundColor: 'purple', margin: 'large' }}>{children}</Quark>
);
