import { get, isFunction } from '@gumption-ui/utils';
import {
  Shorthands,
  Aliases,
  Theme,
  GumptionUIStyleObject,
  GumptionUICSSObject,
  CSSObject,
} from './types';

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

type CSSPropsArgument = { theme: Theme } | Theme;

type FuncsArg<T = Record<string, any>> = {
  styles: T;
  theme: T;
};
type Funcs = Array<(funcsArgs: FuncsArg) => FuncsArg>;

export const interpolate = <
  T extends Record<string, any> = GumptionUIStyleObject,
  R = CSSObject
>(
  ...funcs: Funcs
) => (args?: T) => (props: CSSPropsArgument = {}): R => {
  const theme = 'theme' in props ? props.theme : props;
  const result: any = {};

  funcs.push(getObjectWithVariants);

  const { styles } = pipe<FuncsArg>(...funcs)({
    styles: isFunction(args) ? args(theme) : args || {},
    theme,
  });

  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const alias in styles) {
    const value = styles[alias as keyof GumptionUICSSObject];

    if (value != null) {
      const { aliases, shorthands } = theme;

      const shorthand =
        aliases && alias in aliases
          ? aliases[alias as Aliases]
          : (alias as Exclude<keyof GumptionUICSSObject, Aliases>);

      const properties =
        shorthands && shorthand in shorthands
          ? shorthands[shorthand as Shorthands]
          : [shorthand as Exclude<typeof shorthand, Shorthands>];

      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = properties.length; i < len; i++) {
        const property = properties[i];

        if (typeof value === 'object') {
          result[property] = interpolate(...funcs)(
            (value as unknown) as GumptionUICSSObject,
          )(theme);
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
  return result;
};

function getObjectWithVariants({
  styles,
  theme,
}: {
  styles: GumptionUICSSObject;
  theme: Theme;
}) {
  if (styles.variant) {
    const { variant, ...restStyle } = styles;
    let next: any = restStyle;

    const variants =
      typeof variant === 'string' ? variant.split(' ') : [variant];

    for (let i = 0, len = variants.length; i < len; i += 1) {
      const variant = variants[i]; // eslint-disable-line @typescript-eslint/no-shadow

      const { styles: variantStyles } = getObjectWithVariants({
        styles: get(theme, `variants.${variant as string}`, {}),
        theme,
      });

      next = { ...next, ...variantStyles };
    }

    return {
      styles: next,
      theme,
    };
  }

  return {
    styles,
    theme,
  };
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

function pipe<R>(...fns: Array<(a: R) => R>) {
  return fns.reduce(
    (f, g) => (...value) => f(g(...value)),
    (value) => value,
  );
}
