import * as React from 'react';
import { As, isRenderProp, isObject } from '@gumption-ui/utils';
import { useTheme } from '@gumption-ui/integral';
import { ParseProps } from './types';

export const TYPE_PROP_NAME = '__GUMPTION_TYPE_PLEASE_DO_NOT_USE__';

type PropsWithoutGumption = {
  [key: string]: any;
};

type PropsWithGumption<T extends As> = {
  [key: string]: any;
  __GUMPTION_TYPE_PLEASE_DO_NOT_USE__: [
    T,
    boolean,
    ParseProps['compileStyles'],
  ];
};

export function hasGumptionProps<T extends As>(
  value: unknown,
): value is PropsWithGumption<T> {
  return isObject(value) && TYPE_PROP_NAME in value;
}

export function parseProps<T extends As>(
  type: T,
  props?: ParseProps,
): PropsWithGumption<T> | PropsWithoutGumption | null {
  if (!props) return null;

  const renderProp = typeof type === 'string' && isRenderProp(props.children);

  const { compileStyles, ...restProps } = props;

  const gumptionElement = compileStyles || renderProp;

  return gumptionElement
    ? {
        [TYPE_PROP_NAME]: [type, renderProp, compileStyles],
        ...restProps,
      }
    : restProps;
}

export const Gumption = <T extends As>(
  props: PropsWithGumption<T>,
): JSX.Element => {
  const theme = useTheme();

  const {
    [TYPE_PROP_NAME]: [type, renderProp, compileStyles],
    children,
    ...restProps
  } = props;

  const newProps = compileStyles?.(restProps, theme);

  if (renderProp) {
    return children(newProps);
  }

  return React.createElement(type, newProps, children);
};

if (process.env.NODE_ENV !== 'production') {
  Gumption.displayName = 'GumptionStylePropsInternal';
}
