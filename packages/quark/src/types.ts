import { css } from 'otion';
import * as CSS from 'csstype';
import { LiteralUnion, ValueOf } from 'type-fest';
import { ThemeOrAny } from '@gumption-ui/quark/theme';

export type FirstParameters<T> = T extends (arg: infer T) => any ? T : never;

export type ScopedCSSRules = FirstParameters<typeof css>;

type CSSProperties = CSS.Properties<string | number>;
type ScopedCSSProperties = Omit<CSSProperties, 'all'>;

export type ResponsiveStyleValue<T> = T | Array<T>;

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
    ValueOf<ScopedCSSProperties>
  >,
  ValueOf<ScopedCSSProperties>
>;

type ThemedCSSProperties = ScopedCSSProperties &
  { [key in Matchers]?: ScaleKeys<key> } &
  { [key in Shorthands]?: ScaleKeys<ResolveShorthand<key>> } &
  { [key in Aliases]?: ScaleKeys<ResolveAlias<key>> };

type ThemedResponsiveCSSProperties = {
  [K in keyof ThemedCSSProperties]: ResponsiveStyleValue<
    ThemedCSSProperties[K]
  >;
};

type ThemedCSSPseudos = { [K in CSS.SimplePseudos]?: ThemedCSSProperties };

type CSSSelectorObject = {
  [selector: string]: ThemedStyle | CSSSelectorObject;
};

type ThemedCSSObject =
  | (ThemedResponsiveCSSProperties & ThemedCSSPseudos)
  | CSSSelectorObject;

export type ThemedStyle = ThemedCSSObject;

export type Theme = Partial<ThemeOrAny>;
