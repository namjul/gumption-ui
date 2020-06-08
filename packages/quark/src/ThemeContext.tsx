import * as React from 'react';
import { Theme } from './types';

const ThemeContext = React.createContext<Theme | undefined>(undefined);

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

export function useTheme(): Theme | undefined {
  return React.useContext(ThemeContext);
}
