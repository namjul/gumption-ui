/** jsxImportSource @gumption-ui/otion */
/** @jsx OtionStyling.jsx */
/** @jsxFrag OtionStyling.Fragment */

import * as React from 'react';
import * as OtionStyling from '@gumption-ui/otion';
import { ThemeProvider } from '@gumption-ui/integral';
import { theme } from '../../theme';

const { useStyleConfig } = OtionStyling;

const TestCompX = ({ themeKey, size, variant, baseStyle, ...props }: any) => {
  const htmlProps = useStyleConfig(
    { themeKey, size, variant, baseStyle },
    props,
  );
  return <div {...htmlProps}>I am TestCompX</div>;
};

export const WithPragma = () => (
  <ThemeProvider theme={theme}>
    <TestCompX />
    <span>
      multiple children {123} {'123'} {'hers'} {false} {true}
    </span>
    <span css={{ color: 'primary' }}>i am not a render prop</span>
    {React.createElement(
      'div',
      { css: { color: 'red' } },
      'React.createElement',
    )}
    <button
      variant="button.primary button.lg"
      css={{
        color: ['blue', 'red', 'orange'],
        variant: 'button.secondary',
      }}
    >
      button
    </button>
    <a
      href="#my-anchor"
      css={{
        variant: 'button.primary',
      }}
    >
      a
    </a>
    <>
      <div css={{ color: 'green', margin: 'small' }}>
        ein div <span>ein span in einem div</span>
        <div>ein div in einem div</div>
      </div>
      <p css={{ color: 'red' }}>paragraph</p>
      <div css={{ color: 'yellow' }}>div</div>
    </>
  </ThemeProvider>
);
