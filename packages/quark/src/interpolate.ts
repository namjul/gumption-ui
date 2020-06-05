import { LiteralUnion, ValueOf } from 'type-fest';
import { ThemeOrAny } from '@gumption-ui/quark/theme';
import * as CSS from 'csstype';
import { Tokens, ScopedCSSRules, ScopedCSSProperties } from './types';
import { Theme } from './ThemeContext';

/**
 * The following types are taken from: https://github.com/kripod/glaze/blob/4a9664f4ad54f23af96774e56b609a8c724bf1a7/packages/glaze/src/useStyling.ts#L13-L38
 */

type ResolveShorthand<T extends Tokens<'shorthands'>> = ValueOf<
  ThemeOrAny['shorthands'][T],
  number
>;

type ResolveAlias<
  T extends Tokens<'aliases'>
> = ThemeOrAny['aliases'][T] extends Tokens<'shorthands'>
  ? ResolveShorthand<ThemeOrAny['aliases'][T]>
  : ThemeOrAny['aliases'][T];

type ScaleKeys<Property> = LiteralUnion<
  Extract<
    keyof ThemeOrAny['scales'][ThemeOrAny['matchers'][Extract<
      Property,
      Tokens<'matchers'>
    >]],
    ValueOf<ScopedCSSProperties>
  >,
  ValueOf<ScopedCSSProperties>
>;

export type ResponsiveStyleValue<T> = T | Array<T>;

export type ThemeStyle = ScopedCSSProperties &
  { [key in Tokens<'matchers'>]?: ScaleKeys<key> } &
  { [key in Tokens<'shorthands'>]?: ScaleKeys<ResolveShorthand<key>> } &
  { [key in Tokens<'aliases'>]?: ScaleKeys<ResolveAlias<key>> };

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

type InterpolatePropsArgument = { theme: Theme } | Theme;

export const interpolate = (themedStyle: ThemedStyle = {}) => (
  props: InterpolatePropsArgument = {},
): ScopedCSSRules => {
  const theme = {
    ...('theme' in props ? props.theme : props),
  };
  const result: { [key: string]: any } = {};

  // const styles = responsive(themedStyle)(theme)

  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const alias in themedStyle) {
    const value = themedStyle[alias as keyof ThemedStyle];

    if (value != null) {
      const { aliases, shorthands } = theme;

      const shorthand =
        aliases && alias in aliases
          ? aliases[alias as Tokens<'aliases'>]
          : (alias as Exclude<keyof ThemedStyle, Tokens<'aliases'>>);

      const properties =
        shorthands && shorthand in shorthands
          ? shorthands[shorthand as Tokens<'shorthands'>]
          : [shorthand as Exclude<typeof shorthand, Tokens<'shorthands'>>];

      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = properties.length; i < len; i++) {
        const property = properties[i];

        if (isObject(value)) {
          result[property] = interpolate(value as ThemedStyle)(theme);
        } else {
          const { matchers, scales } = theme;
          const scale =
            matchers && scales
              ? scales[matchers[property as Tokens<'matchers'>]]
              : {};

          result[property] = get(scale, value, value);
        }
      }
    }
  }
  return result as ScopedCSSRules;
};

function isObject(obj: unknown): obj is object {
  return typeof obj === 'object';
}

function isString(s: unknown): s is string {
  return typeof s === 'string';
}

function isNumber(n: unknown): n is number {
  return typeof n === 'number';
}

export function get(
  obj: object,
  key: string | number,
  def?: unknown,
  p?: number,
  undef?: unknown,
): any {
  /* eslint-disable no-param-reassign, no-plusplus */
  const path = key && typeof key === 'string' ? key.split('.') : [key];
  for (p = 0; p < path.length; p++) {
    obj = obj ? (obj as any)[path[p]] : undef;
  }
  return obj === undef ? def : obj;
  /* eslint-enable no-param-reassign, no-plusplus */
}
