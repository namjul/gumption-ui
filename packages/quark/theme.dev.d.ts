import { emptyTokens } from './src/emptyTokens';

declare module '@gumption-ui/quark/theme' {
  type Tokens = typeof emptyTokens;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends Tokens {}
}
