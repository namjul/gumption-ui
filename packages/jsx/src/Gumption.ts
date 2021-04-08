import * as React from 'react';
import { As, isRenderProp } from '@gumption-ui/utils';
import cc from 'classcat';
import { css as toClassname } from 'otion';
import { interpolate, ThemedStyle } from '@gumption-ui/interpolate';
import { useTheme } from '@gumption-ui/integral';

export const Gumption = <T extends As>(
  props: Record<string, any>,
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

  if (typeof type === 'string' && isRenderProp(children)) {
    const { children: _, ...rest } = computedProps;
    return children(rest);
  }

  return React.createElement(type, computedProps, children);
};

if (process.env.NODE_ENV !== 'production') {
  Gumption.displayName = 'GumptionStylePropsInternal';
}