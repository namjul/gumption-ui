import { Theme as MailTheme } from './theme'

declare module '@gumption-ui/quark/theme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MailTheme {}
}
