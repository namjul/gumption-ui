import { theme } from './theme';

declare module '@gumption-ui/interpolate/theme' {
  type NewCssTheme = typeof theme;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends NewCssTheme {}
}
