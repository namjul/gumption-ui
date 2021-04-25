import { As, isEmptyObject, isFunction, isObject } from '@gumption-ui/utils';
import cc from 'classcat';
import { css as toClassname } from 'otion';
import {
  interpolate as createInterpolate,
  Theme,
} from '@gumption-ui/interpolate-new';
import { ParseProps } from '@gumption-ui/jsx';
import { ScopedCSSRules } from 'otion';
import { CssProp, GumptionUICSSObject, GumptionUIStyleObject } from './types';

const responsive = ({
  styles,
  theme,
}: {
  styles: GumptionUICSSObject;
  theme: Theme;
}) => {
  const next: any = {};
  const breakpoints = (theme.breakpoints ?? []) as Array<any>;
  const mediaQueries = [null, ...breakpoints.map((n) => `(min-width: ${n}px)`)];

  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const key in styles) {
    /* eslint-disable no-continue */
    const valuePossiblyFunction = styles[key as keyof GumptionUICSSObject];
    const value = isFunction(valuePossiblyFunction)
      ? valuePossiblyFunction(theme)
      : valuePossiblyFunction;

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
  return {
    styles: next,
    theme,
  };
};

export const interpolate = createInterpolate<
  GumptionUIStyleObject,
  ScopedCSSRules
>(responsive);

export const parseProps = <T extends As>(
  _: T,
  props: Record<string, unknown> | null,
): ParseProps => {
  const { variant, ...nextProps } = props ?? {};

  if (
    !variant &&
    (!nextProps.css ||
      (isObject(nextProps.css) && Object.keys(nextProps.css).length === 0))
  ) {
    return nextProps;
  }

  // either `variant` or `css` exist, therefore styles that need to be compiled
  const next: ParseProps<
    Omit<CssProp, 'variant'> & {
      [name: string]: unknown;
      className?: string;
    }
  > = {
    ...nextProps,
    compileStyles: ({ css, ...nextNextProps }, theme) => {
      const styles = interpolate(css)(theme);
      if (!isEmptyObject(styles)) {
        return {
          ...nextNextProps,
          className: cc([nextNextProps.className, toClassname(styles)]),
        };
      }

      return nextNextProps;
    },
  };

  if (variant) {
    next.css = (theme) => {
      const themedStyle = isFunction(nextProps.css)
        ? nextProps.css(theme)
        : nextProps.css ?? {};
      return {
        ...themedStyle,
        variant: `${variant} ${themedStyle.variant}`,
      };
    };
  }

  return next;
};
