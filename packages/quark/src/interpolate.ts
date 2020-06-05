import { Shorthands, Aliases, ThemedStyle, CSSObject, Theme } from './types';

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

export const interpolate = <T>(themedStyle: ThemedStyle = {}) => (
  props: InterpolatePropsArgument = {},
): CSSObject => {
  const theme = {
    ...('theme' in props ? props.theme : props),
  };
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

        if (isObject(value)) {
          result[property] = interpolate(value as ThemedStyle)(theme);
        } else {
          const { matchers = {}, scales = {} } = theme;

          const scaleName = get(matchers, property);
          const scale = get(scales, scaleName);
          const transform = get(transforms, property, get);
          const val = transform(scale, value, value);

          result[property] = val;
        }
      }
    }
  }
  return result as CSSObject;
};

function isObject(obj: unknown): obj is object {
  return typeof obj === 'object';
}

function get(
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
