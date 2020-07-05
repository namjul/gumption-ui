import { Theme as BaseTheme } from './theme';

declare module '@gumption-ui/interpolate/theme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends BaseTheme {}
}
