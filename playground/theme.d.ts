import { base } from './src/theme';

declare module '@gumption-ui/interpolate/theme' {
  type BaseTheme = typeof base;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends BaseTheme {}
}
