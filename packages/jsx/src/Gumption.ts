import * as React from 'react';
import { As, isRenderProp } from '@gumption-ui/utils';
import cc from 'classcat';
import { css as toClassname } from 'otion';
import { interpolate } from '@gumption-ui/interpolate';
import { useTheme } from '@gumption-ui/integral';

export const Gumption = <T extends As>(
  props: Record<string, any> & {
    typePropName: T;
  },
): JSX.Element => {
  const theme = useTheme();

  const { typePropName: type, css = {}, children, ...htmlProps } = props;

  let computedProps = { ...htmlProps };

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
