import * as React from 'react';
import { Theme } from '@gumption-ui/interpolate-new';

export const ThemeContext = React.createContext<Theme | undefined>(undefined);

interface ThemeProviderProps {
  theme: Theme;
  children: React.ReactNode;
}

export function ThemeProvider({
  theme,
  children,
}: ThemeProviderProps): JSX.Element {
  return React.createElement(ThemeContext.Provider, { value: theme }, children);
}

export function useTheme(): Theme | undefined {
  return React.useContext(ThemeContext);
}
