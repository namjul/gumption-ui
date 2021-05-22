import * as React from 'react';
import { PartialDeep } from '@gumption-ui/utils';
import { ThemeOrAny } from '@gumption-ui/interpolate-new/theme';

type Theme = PartialDeep<ThemeOrAny>;

export const ThemeContext = React.createContext<Theme | undefined>({});

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
