import base from '@gumption-ui/theme-base'; // eslint-disable-line import/no-extraneous-dependencies

declare module '@gumption-ui/quark/theme' {
  type Tokens = typeof base;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends Tokens {}
}
