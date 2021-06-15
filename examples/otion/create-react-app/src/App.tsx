import React from 'react';
import {
  ThemeProvider,
  kwark,
  createHook,
  OtionHTMLProps,
} from '@gumption-ui/otion';
import { theme } from './theme';

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

const useParent = createHook<{}, OtionHTMLProps>({
  useProps: (options, htmlProps) => {
    console.log('options in useParent', options);
    return {
      'data-test': 'my data attibute',
      ...htmlProps,
    };
  },
});

const Parent = kwark('div', {
  name: 'parent',
  useHook: useParent,
  // themeKey: 'Parent',
  styleConfig: parentStyleConfig,
  variant: 'outline',
  size: 'sm',
});

const Child = kwark('div');

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Parent css={{ color: 'primary', backgroundColor: 'secondary' }}>
        Parent
        <Child css={{ color: 'secondary', backgroundColor: 'primary' }}>
          Child
        </Child>
      </Parent>
    </ThemeProvider>
  );
}

export default App;
