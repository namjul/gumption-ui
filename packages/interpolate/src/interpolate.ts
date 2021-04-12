import * as CSS from 'csstype';
import { css as otionCss } from 'otion'; // TODO remove
import type { ThemeOrAny } from '@gumption-ui/interpolate/theme';
import {
  get,
  isFunction,
  FirstParameter,
  LiteralUnion,
  ValueOf,
  ResponsiveStyleValue,
} from '@gumption-ui/utils';
import {
  Shorthands,
  Aliases,
  Matchers,
  Variants,
  CSSProperties,
} from './types';

export type Theme = Partial<ThemeOrAny>;

type ScopedCSSRules = FirstParameter<typeof otionCss>;
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

type VariantProperty = {
  variant?: Variants;
};

type ThemedCSSPseudos = { [key in CSS.SimplePseudos]?: ThemedCSSProperties };

type AllCSSProperties = ThemedCSSProperties & ThemedCSSPseudos;

type AllResponsiveCSSProperties = {
  [key in keyof AllCSSProperties]:
    | ResponsiveStyleValue<AllCSSProperties[key]>
    | ((theme: Theme) => ResponsiveStyleValue<AllCSSProperties[key]>);
};

type CSSSelectorObject = {
  selectors?: ResponsiveStyleValue<{
    [selector: string]: AllResponsiveCSSProperties;
  }>;
};

type CSSAtRulesObject = {
  [key in CSS.AtRules]?: {
    [rule: string]: AllResponsiveCSSProperties;
  };
};

// TODO support preset pseudo selectors (`_hover, _focus, _disabled`, etc.)
export type ThemedStyle = AllResponsiveCSSProperties &
  VariantProperty &
  CSSSelectorObject &
  CSSAtRulesObject;

export type ThemedStyleWithTheme =
  | ThemedStyle
  | ((theme: Theme) => ThemedStyle);

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
    const valuePossiblyFunction = themedStyle[key as keyof ThemedStyle];
    const value = isFunction(valuePossiblyFunction)
      ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: TODO ThemedStyle currently does not support functions as value
        valuePossiblyFunction(theme)
      : valuePossiblyFunction;

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

  const themedStyleWithoutVariants: ThemedStyle = getObjectWithVariants(
    themedStyle,
    theme,
  );

  const styles = responsive(themedStyleWithoutVariants)(theme);

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

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore: TODO ThemedStyle currently does not support functions as value
          let val = isFunction(value) ? value(theme) : value;
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

function getObjectWithVariants(
  themedStyle: ThemedStyle,
  theme: Theme,
): ThemedStyle {
  if (themedStyle?.variant) {
    let next: any = {};
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in themedStyle) {
      const valuePossiblyFunction = themedStyle[key as keyof ThemedStyle];
      if (key === 'variant') {
        const value = isFunction(valuePossiblyFunction)
          ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: TODO ThemedStyle currently does not support functions as value
            valuePossiblyFunction(theme)
          : valuePossiblyFunction;

        const variant = getObjectWithVariants(
          get(theme, `variants.${value as string}`),
          theme,
        );
        next = { ...next, ...variant };
      } else {
        next[key] = valuePossiblyFunction;
      }
    }
    return next as ThemedStyle;
  }
  return themedStyle;
}

function positiveOrNegative(
  scale: Record<string, unknown>,
  value: string | number,
): string | number {
  if (typeof value !== 'number' || value >= 0) {
    if (typeof value === 'string' && value.startsWith('-')) {
      const valueWithoutMinus = value.substring(1);
      const n = get(scale, valueWithoutMinus, valueWithoutMinus);
      if (typeof n === 'number') return Number(n) * -1;
      return `-${n}`;
    }
    return get(scale, value, value);
  }
  const absolute = Math.abs(value);
  const n = get(scale, absolute, absolute);
  if (typeof n === 'string') return `-${n}`;
  return Number(n) * -1;
}
