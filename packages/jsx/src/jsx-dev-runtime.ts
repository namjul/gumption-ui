/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  // @ts-ignore
  Fragment,
  // @ts-ignore
  jsxDEV as reactJsxDEV,
} from 'react/jsx-dev-runtime';
import { As, PropsOf } from '@gumption-ui/utils';
import { Gumption } from './Gumption';
import type { GumptionJSX } from './jsx-namespace';
import { hasOwnProperty } from './utils';

export type { GumptionJSX as JSX } from './jsx-namespace';
export { Fragment };

export const jsxDEV = <T extends As>(
  type: T,
  props: PropsOf<T>,
  key: string | undefined,
  isStaticChildren: boolean,
  source: {
    filename: string;
    lineNumber: number;
    columnNumber: number;
  },
  self: any, // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
): GumptionJSX.Element => {
  if (!hasOwnProperty.call(props, 'css')) {
    return reactJsxDEV(type, props, key, isStaticChildren, source, self);
  }

  return reactJsxDEV(
    Gumption,
    { typePropName: type, ...props },
    key,
    isStaticChildren,
    source,
    self,
  );
};
