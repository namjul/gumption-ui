import { css } from 'otion';
import { css as interpolate, ThemedStyle } from '@gumption-ui/css';
import { useTheme } from './ThemeContext';

export function useStyling(): (themedStyle: ThemedStyle) => string {
  const theme = useTheme();
  return function sx(themedStyle: ThemedStyle): string {
    return css(interpolate(themedStyle)(theme));
  };
}
