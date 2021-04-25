type AnyIfEmpty<T extends object> = keyof T extends never ? any : T; // eslint-disable-line @typescript-eslint/ban-types

// type ItselfIfEmpty<T> =

declare module '@gumption-ui/interpolate-new/theme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme {}
  export type ThemeOrAny = AnyIfEmpty<Theme>;

  type X<T = any> = T;
  type Y = string;

  export interface StylePropertyValueEnhancer<T = X> {
    (theme: Theme): T<Exclude<T, undefined>>;
  }

  export interface GenericIdentityFn {
    <Type>(arg: Type): Type;
  }

  // interface XRegistry {
  //   // A: string;
  //   // B: number;
  // }

  // export type StylePropertyValueEnhancer<T> = XRegistry[keyof XRegistry];

  // type X= XRegistry[keyof XRegistry];

  // //... And in the other file
  // declare module "someModule" {
  //   interface XRegistry { D:D }
  // }

  // export interface StylePropertyValueEnhancer<T> T
  // export type StylePropertyValueEnhancer = ItselfIfEmpty<>;
}
