import * as React from 'react';
import { quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies

const Quark = quark('div');

export const HeaderBar = () => (
  <Quark css={{ backgroundColor: 'violet' }}>I am HeaderBar</Quark>
);
