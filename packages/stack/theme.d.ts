import { emptyTokens } from '@gumption-ui/quark';

declare module '@gumption-ui/css/theme' {
  type Tokens = typeof emptyTokens;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends Tokens {}
}
