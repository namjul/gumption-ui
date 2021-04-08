/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  // @ts-ignore
  Fragment,
  // @ts-ignore
  jsx as reactJsx,
  // @ts-ignore
  jsxs as reactJsxs,
} from 'react/jsx-runtime';
import { As, isRenderProp } from '@gumption-ui/utils';
import { Gumption } from './Gumption';
import type { GumptionJSX } from './jsx-namespace';
import { hasOwnProperty } from './utils';
import { parseProps } from './parseProps';

export type { GumptionJSX as JSX } from './jsx-namespace';
export { Fragment };

export function jsx<T extends As>(
  type: T,
  props: Record<string, any>,
  key: string | number,
): GumptionJSX.Element {
  const nextProps = parseProps(type, props);

  if (nextProps == null || !hasOwnProperty.call(nextProps, 'css')) {
    if (
      typeof type === 'string' &&
      nextProps &&
      isRenderProp(nextProps.children)
    ) {
      const { children, ...rest } = nextProps;
      return children(rest);
    }

    return reactJsx(type, nextProps || props, key);
  }

  return reactJsx(Gumption, nextProps, key);
}

export function jsxs<T extends As>(
  type: T,
  props: Record<string, any>,
  key: string | number,
): GumptionJSX.Element {
  const nextProps = parseProps(type, props);

  if (nextProps == null || !hasOwnProperty.call(nextProps, 'css')) {
    if (
      typeof type === 'string' &&
      nextProps != null &&
      isRenderProp(nextProps.children)
    ) {
      const { children, ...rest } = nextProps;
      return children(rest);
    }

    return reactJsxs(type, nextProps || props, key);
  }

  return reactJsxs(Gumption, nextProps, key);
}
