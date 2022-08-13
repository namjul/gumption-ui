import React from 'react';
import {
  ThemeProvider,
  kwark,
  createHook,
  OtionHTMLProps,
  useStyleConfig,
} from '@gumption-ui/otion';
import { theme } from './theme';

const Box = kwark('div');

const parentStyleConfig = {
  baseStyle: {
    boxSizing: 'border-box',
  },
  sizes: {
    sm: {
      fontSize: 'small',
    },
    md: {
      fontSize: 'medium',
    },
    lg: {
      fontSize: 'large',
    },
  },
  variants: {
    outline: {
      borderRadius: 'large',
    },
  },
  // defaultOptions: {
  //   variant: 'outline',
  //   size: 'md',
  // },
  slots: {
    Child1: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultOptions: {},
    },
    Child2: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultOptions: {},
    },
  },
};

const useParent1 = createHook<{}, OtionHTMLProps>({
  useProps: (options, htmlProps) => {
    console.log('options in useParent', options);
    return {
      id: 'parent1',
      ...htmlProps,
    };
  },
});

const Parent1 = kwark('div', {
  name: 'parent',
  useHook: useParent1,
  // themeKey: 'Parent',
  styleConfig: parentStyleConfig,
  variant: 'outline',
  size: 'sm',
});

const Child = kwark('div');

const Parent2 = (props: any) => {
  const { size, variant, children, ...rest } = props;
  const { css, ...htmlProps } = useStyleConfig(
    {
      size,
      variant,
      styleConfig: parentStyleConfig,
    },
    { id: 'parent2', ...rest },
  );

  return (
    <Box css={css} {...htmlProps}>
      <SlotsProvider slots={}>{children}</SlotsProvider>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Parent1 css={{ color: 'primary', backgroundColor: 'secondary' }}>
        Parent1
        <Child css={{ color: 'secondary', backgroundColor: 'primary' }}>
          Child
        </Child>
      </Parent1>
      <Parent2>Parent2</Parent2>
      <>
        <div
          slots={{
            a: { color: 'red' },
            p: { color: 'green' },
            span: { color: 'blue' },
          }}
        >
          <a>will have color red</a>
          <p>will have color green</p>
          <span>will have color blue</span>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
