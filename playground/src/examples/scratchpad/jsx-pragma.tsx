/* eslint-disable no-console */

/** @jsx jsx */
/** @jsxFrag Fragment */

import { Fragment } from 'react';
import { jsx, ThemeProvider } from '@gumption-ui/jsx';
import { quark } from '@gumption-ui/quark';
import { base } from '../../theme';

const theme = {
  ...base,
};

const Quark = quark('div');

export const WithPragma = () => (
  <ThemeProvider theme={theme}>
    <span>i am a span</span>
    <>
      <div css={{ color: 'green', margin: 'small' }}>
        ein div <span>ein span in einem div</span>
        <div>ein div in einem div</div>
      </div>
      <Quark css={{ color: 'red' }}>
        <div>
          with pragma and a <Quark css={{ color: 'blue' }}>quark</Quark>
        </div>
      </Quark>
      <div>
        with pragma and a <Quark>quark</Quark>
      </div>
    </>
  </ThemeProvider>
);
