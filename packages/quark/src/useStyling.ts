import { css } from 'otion';
import { interpolate } from './interpolate';
import { ScopedCSSRules, ThemedStyle } from './types';
import { useTheme } from './ThemeContext';

export function useStyling(): (themedStyle: ThemedStyle) => string {
  const theme = useTheme();
  return function sx(themedStyle: ThemedStyle): string {
    return css(interpolate(themedStyle)(theme) as ScopedCSSRules);
  };
}
