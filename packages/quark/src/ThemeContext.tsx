import * as React from 'react';
import { ThemeOrAny } from '@gumption-ui/quark/theme';

export type Theme = Partial<ThemeOrAny>;

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
