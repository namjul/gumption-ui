import * as React from 'react';
import { Tokens, ScopedCSSProperties, ObjectOrArray } from './types';

export type Theme = {
  scales?: { [key: string]: Readonly<ObjectOrArray<number | string>> };
  shorthands?: { [key: string]: ReadonlyArray<keyof ScopedCSSProperties> };
  aliases?: {
    [key: string]:
      | keyof ScopedCSSProperties
      | Extract<Tokens<'shorthands'>, string>;
  };
  matchers?: {
    [property in keyof ScopedCSSProperties]: Extract<Tokens<'scales'>, string>;
  };
};

const ThemeContext = React.createContext<Theme>({});

export interface ThemeProviderProps {
  theme: Theme;
  children: React.ReactNode;
}

export function ThemeProvider({
  theme,
  children,
}: ThemeProviderProps): JSX.Element {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  return React.useContext(ThemeContext);
}
