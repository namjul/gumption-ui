import { css } from 'otion';
import * as CSS from 'csstype';
import { LiteralUnion, ValueOf } from 'type-fest';
import { ThemeOrAny } from '@gumption-ui/quark/theme';

export type FirstParameters<T> = T extends (arg: infer T) => any ? T : never;

export type ScopedCSSRules = FirstParameters<typeof css>;

export type CSSProperties = CSS.Properties<string | number>;

export interface CSSObject
  extends CSSProperties,
    CSSPseudosForCSSObject,
    CSSOthersObjectForCSSObject {}

type CSSPseudosForCSSObject = { [K in CSS.Pseudos]?: CSSObject };
type CSSInterpolation = undefined | number | string | CSSObject;
interface CSSOthersObjectForCSSObject {
  [propertiesName: string]: CSSInterpolation;
}

export type ResponsiveStyleValue<T> = T | Array<T>;

// Tokens
export type Tokens<T extends keyof ThemeOrAny> = Extract<
  keyof ThemeOrAny[T],
  string | number
>;
export type Matchers = Tokens<'matchers'>;
export type Shorthands = Tokens<'shorthands'>;
export type Aliases = Tokens<'aliases'>;

type ResolveShorthand<T extends Shorthands> = ValueOf<
  ThemeOrAny['shorthands'][T],
  number
>;

type ResolveAlias<
  T extends Aliases
> = ThemeOrAny['aliases'][T] extends Shorthands
  ? ResolveShorthand<ThemeOrAny['aliases'][T]>
  : ThemeOrAny['aliases'][T];

type ScaleKeys<Property> = LiteralUnion<
  Extract<
    keyof ThemeOrAny['scales'][ThemeOrAny['matchers'][Extract<
      Property,
      Matchers
    >]],
    ValueOf<CSSProperties>
  >,
  ValueOf<CSSProperties>
>;

export type ThemeStyle = CSSProperties &
  { [key in Matchers]?: ScaleKeys<key> } &
  { [key in Shorthands]?: ScaleKeys<ResolveShorthand<key>> } &
  { [key in Aliases]?: ScaleKeys<ResolveAlias<key>> };

type ThemeCSSProperties = {
  [K in keyof ThemeStyle]: ResponsiveStyleValue<ThemeStyle[K]>;
};

type CSSPseudoSelectorProps = { [K in CSS.SimplePseudos]?: ThemeCSSProperties };

type CSSSelectorObject = {
  [cssSelector: string]: ThemeStyle | CSSSelectorObject;
};

export type ThemedStyle =
  | (ThemeCSSProperties & CSSPseudoSelectorProps)
  | CSSSelectorObject;

export type Theme = Partial<ThemeOrAny>;
