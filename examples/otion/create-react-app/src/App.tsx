import React from 'react';
import {
  ThemeProvider,
  kwark as otionKwark,
  createHook as otionCreateHook,
  OtionHTMLProps,
} from '@gumption-ui/otion';
import { theme } from './theme';

const useMyDiv = otionCreateHook<{}, OtionHTMLProps>({
  useProps: (_, htmlProps) => ({
    'data-test': 'my data attibute',
    ...htmlProps,
  }),
});

const MyDiv = otionKwark('div', {
  useHook: useMyDiv,
  themeKey: 'MyDiv',
  baseStyle: {
    boxSizing: 'border-box',
  },
  variant: 'outline',
  size: 'sm',
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MyDiv css={{ color: 'primary', backgroundColor: 'secondary' }}>
        MyDiv
      </MyDiv>
    </ThemeProvider>
  );
}

export default App;
