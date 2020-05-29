import { LiteralUnion, ValueOf } from 'type-fest';
import { ThemeOrAny } from '@gumption-ui/quark/theme';
import * as CSS from 'csstype';
import {
  Tokens,
  CSSProperties,
  ScopedCSSRules,
  ScopedCSSProperties,
  CSSGroupingRules,
  ObjectOrArray,
  CSSStyleRules,
} from './types';
import { Theme } from './ThemeContext';

// export interface CSSRules
//   extends ScopedCSSProperties,
//     CSSPseudosForCSSObject,
//     CSSSelectorsForCSSObject {}

// type CSSPseudosForCSSObject = { [K in CSS.SimplePseudos]?: CSSRules };
// type CSSSelectorsForCSSObject = {
//   selectors?: {
//     [selector: string]: CSSRules;
//   };
// };
// type CSSGroupingRules = {
//   '@media'?: {
//     [conditionText: string]: CSSRules;
//   };
//   '@supports'?: {
//     [conditionText: string]: CSSRules;
//   };
// };

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

// type ScaleKeys<Property> =
//   | Extract<
//       keyof ThemeOrAny['scales'][ThemeOrAny['matchers'][Extract<
//         Property,
//         Tokens<'matchers'>
//       >]],
//       ValueOf<CSSProperties>
//     >
//   | ValueOf<CSSProperties>;

type ScaleKeys<Property> = LiteralUnion<
  Extract<
    keyof ThemeOrAny['scales'][ThemeOrAny['matchers'][Extract<
      Property,
      Tokens<'matchers'>
    >]],
    ValueOf<CSSProperties>
  >,
  ValueOf<CSSProperties>
>;

// TODO CSSStyleRules<ResponsiveStyleValue<ScopedCSSRules>>
export type ThemedStyle = CSSStyleRules<ScopedCSSRules> &
  CSSGroupingRules<ScopedCSSRules> &
  { [key in Tokens<'matchers'>]?: ScaleKeys<key> } &
  { [key in Tokens<'shorthands'>]?: ScaleKeys<ResolveShorthand<key>> } &
  { [key in Tokens<'aliases'>]?: ScaleKeys<ResolveAlias<key>> };

function resolveProperty(
  key: string,
  theme: Theme,
): Readonly<Array<keyof ScopedCSSRules>> {
  const { aliases = {}, shorthands = {} } = theme;

  const shorthand =
    key in aliases
      ? aliases[key]
      : (key as Exclude<keyof ThemedStyle, Tokens<'aliases'>>);

  const properties =
    shorthand in shorthands
      ? shorthands[shorthand]
      : [shorthand as Exclude<typeof shorthand, Tokens<'shorthands'>>];
  return properties;
}

// function interpolateValue(
//   value: string | number | { [key: string]: string | number },
//   theme: Theme,
// ): ValueOf<ScopedCSSProperties> {}

// function resolveValue(
//   property: keyof ScopedCSSProperties,
//   value: number | string | undefined,
//   theme: Theme,
// ): ValueOf<CSSProperties> {
//   const { matchers = {}, scales = {} } = theme;
//   const scaleName = matchers[property];
//   const scale = scaleName ? scales[scaleName] : {};
//   return scale[value] ?? value;
// }

// function interpolateTheme(
//   style: ThemedStyle,
//   theme: Theme,
// ): ScopedCSSProperties {}

type InterpolatePropsArgument = { theme: Theme } | Theme;

export const interpolate = (themedStyle: ThemedStyle = {}) => (
  props: InterpolatePropsArgument = {},
): ScopedCSSRules => {
  const theme: Theme = {
    ...('theme' in props ? props.theme : props),
  };
  const result: { [key: string]: any } = {};

  // const styles = responsive(themedStyle)(theme)

  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const alias in themedStyle) {
    const value = themedStyle[alias as keyof ThemedStyle] as any;

    if (value != null) {
      const properties = resolveProperty(alias, theme);

      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = properties.length; i < len; i++) {
        const property = properties[i] as string;

        if (property === '@media' || property === '@supports') {
          Object.keys(value).forEach((conditionText) => {
            if (!result[property]) {
              result[property] = {};
            }
            result[property][conditionText] = interpolate(
              value[conditionText] || {},
            )(theme);
          });
        } else if (property === 'selectors') {
          Object.keys(value).forEach((selectorKey) => {
            if (!result[property]) {
              result[property] = {};
            }
            result[property][selectorKey] = interpolate(
              value[selectorKey] || {},
            )(theme);
          });
        } else if (isObject(value)) {
          result[property] = interpolate(value)(theme);
        } else {
          const { matchers = {}, scales = {} } = theme;
          const scaleName = matchers[property as keyof ScopedCSSProperties];
          const scale = scaleName ? scales[scaleName] : {};
          if (Array.isArray(scale) && isNumber(value)) {
            result[property] = scale[value] ?? value;
          } else if (isObject(scale) && isString(value)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore Type 'string & { _?: undefined; }' from LiteralUnion
            result[property] = scale[value] ?? value;
          } else {
            result[property] = value;
          }
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
