import { css } from 'otion';
import { interpolate, ThemedStyle } from './interpolate';
import { useTheme } from './ThemeContext';

export function useStyling(): (themedStyle: ThemedStyle) => string {
  const theme = useTheme();
  return function sx(themedStyle: ThemedStyle): string {
    return css(interpolate(themedStyle, theme));
  };
}
