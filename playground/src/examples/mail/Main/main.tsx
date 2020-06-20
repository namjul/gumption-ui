import * as React from 'react';
import { quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies

const Quark = quark('div');

export const Main = () => (
  <>
    <Quark
      css={{
        flex: '30%',
        backgroundColor: 'white',
        marginRight: '30px',
        boxShadow: '1px 5px 24px 0 rgba(68,102,242,.05)',
      }}
    />
    <Quark
      css={{
        flex: '60%',
        backgroundColor: 'white',
        boxShadow: '1px 5px 24px 0 rgba(68,102,242,.05)',
      }}
    />
  </>
);
