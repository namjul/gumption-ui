import { theme } from './src/theme';

declare module '@gumption-ui/interpolate-new/theme' {
  type BaseTheme = typeof theme;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends BaseTheme {}
}
