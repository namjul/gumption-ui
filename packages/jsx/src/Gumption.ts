import * as React from 'react';
import { As, PropsOf } from '@gumption-ui/utils';
import cc from 'classcat';
import { css as toClassname } from 'otion';
import { interpolate, ThemedStyle } from '@gumption-ui/interpolate';
import { useTheme } from './theming';

type GumptionProps<T extends As> = PropsOf<T> & {
  typePropName: T;
  css?: ThemedStyle;
};

export const Gumption = <T extends As>(
  props: GumptionProps<T>,
): JSX.Element => {
  const theme = useTheme();

  const { css = {}, typePropName: type, children, ...htmlProps } = props;

  let computedProps = { ...htmlProps };

  // TODO allow css to be a function?
  computedProps = {
    ...computedProps,
    className: cc([
      computedProps.className,
      toClassname(interpolate(css)(theme)),
    ]),
  };

  return React.createElement(type, computedProps, children);
};

if (process.env.NODE_ENV !== 'production') {
  Gumption.displayName = 'GumptionStylePropsInternal';
}
