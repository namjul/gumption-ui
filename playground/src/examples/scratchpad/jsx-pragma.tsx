/* eslint-disable no-console */

/** @jsx jsx */
/** @jsxFrag Fragment */

import { jsx } from '@gumption-ui/jsx';
import * as React from 'react';
import { quark } from '@gumption-ui/quark';

const Quark = quark('div');

export const WithPragma = () => (
  <React.Fragment>
    <div>
      ein div <span>ein span in einem div</span>
    </div>
    <Quark css={{ color: 'red' }}>
      <div>
        with pragma and a <Quark>quark</Quark>
      </div>
    </Quark>
    <div>
      with pragma and a <Quark>quark</Quark>
    </div>
  </React.Fragment>
);
