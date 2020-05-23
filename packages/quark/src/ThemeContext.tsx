import * as React from 'react';
import { Tokens } from './types';

type ObjectOrArray<T> = T[] | { [key: string]: T };

type Theme = {
  scales?: { [key: string]: Readonly<ObjectOrArray<number | string>> };
  shorthands?: { [key: string]: ReadonlyArray<keyof React.CSSProperties> };
  aliases?: {
    [key: string]:
      | keyof React.CSSProperties
      | Extract<Tokens<'shorthands'>, string>;
  };
  matchers?: {
    [property in keyof React.CSSProperties]: Extract<Tokens<'scales'>, string>;
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
