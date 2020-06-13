import * as React from 'react';
import { Quark, ThemeProvider } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies
import { theme } from './treat';

export const Root = () => (
  <ThemeProvider theme={theme}>
    {/* <Quark as="a" href="#" css={{ padding: 'small'}} className="jo" _css={{ padding: 'large' }}> */}
    {/*   This is my box */}
    {/* </Quark> */}
    <Quark as="a" href="#">
      This is my box
      <Quark>quark</Quark>
    </Quark>
    <Quark css={{ backgroundColor: 'red' }}>This is my element</Quark>
    <Quark as="a" href="#">
      This is my box
    </Quark>
    {/* <Quark as="a" href="#" asdfasdf="löasdf"> */}
    {/*   This is my box */}
    {/* </Quark> */}
    {/* <Quark href="#" data-asdfasdf="löasdf"> */}
    {/*   This is my box */}
    {/* </Quark> */}
    <Quark
      css={{
        backgroundColor: 'green',
        selectors: {
          '& > * + *': {
            marginLeft: 16,
          },
        },
      }}
      _css={{
        padding: 1,
        margin: 30,
        paddingY: 'medium',
        bg: 'orange',
        marginTop: ['small', 'medium', 'large'],
      }}
    >
      This is my box
    </Quark>
  </ThemeProvider>
);
