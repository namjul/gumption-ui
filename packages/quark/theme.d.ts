type AnyIfEmpty<T extends object> = keyof T extends never ? any : T;

declare module '@gumption-ui/quark/theme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme {}
  export type ThemeOrAny = AnyIfEmpty<Theme>;
}
