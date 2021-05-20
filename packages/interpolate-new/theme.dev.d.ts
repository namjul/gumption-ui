import { theme } from './src/test/interpolate.test';

declare module '@gumption-ui/interpolate-new/theme' {
  type Tokens = typeof theme;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends Tokens {}
}
