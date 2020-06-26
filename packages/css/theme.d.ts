type AnyIfEmpty<T extends object> = keyof T extends never ? any : T; // eslint-disable-line @typescript-eslint/ban-types

declare module '@gumption-ui/css/theme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme {}
  export type ThemeOrAny = AnyIfEmpty<Theme>;
}
