import * as CSS from 'csstype';
import { css } from 'otion';
import { LiteralUnion, ValueOf } from 'type-fest';
import { ThemeOrAny } from '@gumption-ui/quark/theme';
import {
  Shorthands,
  Aliases,
  Matchers,
  FirstParameters,
  CSSProperties,
  ResponsiveStyleValue,
  Theme,
} from './types';
import { get } from './utils';

type ScopedCSSRules = FirstParameters<typeof css>;
type ScopedCSSProperties = Omit<CSSProperties, 'all'>;

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
  [K in keyof ThemedCSSProperties]:
    | ResponsiveStyleValue<ThemedCSSProperties[K]>
    | ((theme: Theme) => ResponsiveStyleValue<ThemedCSSProperties[K]>);
};

type ThemedCSSPseudos = { [K in CSS.SimplePseudos]?: ThemedCSSProperties };

// TODO support preset pseudo selectors (`_hover, _focus, _disabled`, etc.)
type CSSSelectorObject = {
  [selector: string]: ThemedStyle | CSSSelectorObject;
};

type ThemedCSSObject =
  | (ThemedResponsiveCSSProperties & ThemedCSSPseudos)
  | CSSSelectorObject;

export type ThemedStyle = ThemedCSSObject;

const transforms = [
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'top',
  'bottom',
  'left',
  'right',
].reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: positiveOrNegative,
  }),
  {},
);

type InterpolatePropsArgument = { theme: Theme } | Theme;

const responsive = (themedStyle: ThemedStyle = {}) => (
  theme: Theme = {},
): ThemedStyle => {
  const next: any = {};
  const breakpoints = (theme.breakpoints ?? []) as Array<any>;
  const mediaQueries = [null, ...breakpoints.map((n) => `(min-width: ${n}px)`)];

  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const key in themedStyle) {
    /* eslint-disable no-continue */
    const value = themedStyle[key as keyof ThemedStyle];

    if (value === null) continue;
    if (!Array.isArray(value)) {
      next[key] = value;
      continue;
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < value.slice(0, mediaQueries.length).length; i++) {
      const media = mediaQueries[i];
      if (!media) {
        next[key] = value[i];
        continue;
      }
      next['@media'] = next['@media'] || {};
      if (value[i] == null) continue;
      next['@media'][media] = next['@media'][media] || {};
      next['@media'][media][key] = value[i];
    }
    /* eslint-enable no-continue */
  }
  return next as ThemedStyle;
};

export const interpolate = (themedStyle: ThemedStyle = {}) => (
  props: InterpolatePropsArgument = {},
): ScopedCSSRules => {
  const theme = 'theme' in props ? props.theme : props;
  const result: any = {};
  const styles = responsive(themedStyle)(theme);

  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const alias in styles) {
    const value = styles[alias as keyof ThemedStyle];

    if (value != null) {
      const { aliases, shorthands } = theme;

      const shorthand =
        aliases && alias in aliases
          ? aliases[alias as Aliases]
          : (alias as Exclude<keyof ThemedStyle, Aliases>);

      const properties =
        shorthands && shorthand in shorthands
          ? shorthands[shorthand as Shorthands]
          : [shorthand as Exclude<typeof shorthand, Shorthands>];

      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = properties.length; i < len; i++) {
        const property = properties[i];

        if (typeof value === 'object') {
          result[property] = interpolate(value as ThemedStyle)(theme);
        } else {
          const { matchers = {}, scales = {} } = theme;
          const scaleName = get(matchers, property);
          const scale = get(scales, scaleName);

          if (!scale) {
            result[property] = value;
            continue; // eslint-disable-line no-continue
          }

          const transform = get(transforms, property, get);

          /*
           * `value` can be:
           * a) a function
           * b) reference to another token value
           * c) scale value
           * d) css value
           */

          let val = typeof value === 'function' ? value(theme) : value;
          const scaleValue =
            typeof val === 'number' ? scale[val] : get(scale, val as string);

          const refrenceScaleValue = get(scale, scaleValue || '');

          val = refrenceScaleValue ?? scaleValue ?? val;
          result[property] = transform(scale, val, val);
        }
      }
    }
  }
  return result as ScopedCSSRules;
};

function positiveOrNegative(
  scale: object,
  value: string | number,
): string | number {
  if (typeof value !== 'number' || value >= 0) {
    if (typeof value === 'string' && value.startsWith('-')) {
      const valueWithoutMinus = value.substring(1);
      const n = get(scale, valueWithoutMinus, valueWithoutMinus);
      return `-${n}`;
    }
    return get(scale, value, value);
  }
  const absolute = Math.abs(value);
  const n = get(scale, absolute, absolute);
  if (typeof n === 'string') return `-${n}`;
  return n * -1;
}
