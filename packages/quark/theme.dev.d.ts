import { defaultTokens } from './src/defaultTokens';

declare module '@gumption-ui/quark/theme' {
  type Tokens = typeof defaultTokens;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends Tokens {}
}
