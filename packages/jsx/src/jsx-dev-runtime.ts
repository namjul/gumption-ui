/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  // @ts-ignore
  Fragment,
  // @ts-ignore
  jsxDEV as reactJsxDEV,
} from 'react/jsx-dev-runtime';
import { As, isRenderProp } from '@gumption-ui/utils';
import { Gumption } from './Gumption';
import type { GumptionJSX } from './jsx-namespace';
import { hasOwnProperty } from './utils';
import { parseProps } from './parseProps';

export type { GumptionJSX as JSX } from './jsx-namespace';
export { Fragment };

export const jsxDEV = <T extends As>(
  type: T,
  props: Record<string, any>,
  key: string | undefined,
  isStaticChildren: boolean,
  source: {
    filename: string;
    lineNumber: number;
    columnNumber: number;
  },
  self: any, // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
): GumptionJSX.Element => {
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
    return reactJsxDEV(
      type,
      nextProps || props,
      key,
      isStaticChildren,
      source,
      self,
    );
  }

  return reactJsxDEV(Gumption, nextProps, key, isStaticChildren, source, self);
};
