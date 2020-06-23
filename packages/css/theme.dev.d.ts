import { theme } from './src/test/theme';

declare module '@gumption-ui/css/theme' {
  type Tokens = typeof theme;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends Tokens {}
}
