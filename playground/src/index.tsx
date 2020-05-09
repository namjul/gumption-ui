import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies

const Box = quark('div');
const A = quark('a');

const QuarkPowered = quark(A);

const Root = () => (
  <Box as={QuarkPowered} href="#">
    This is my box
  </Box>
);
ReactDOM.render(<Root />, document.getElementById('root'));
