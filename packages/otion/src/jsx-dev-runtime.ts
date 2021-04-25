/* eslint-disable @typescript-eslint/ban-ts-comment */

import { As } from '@gumption-ui/utils';
import {
  jsxDEV as internalJsxDEV,
  Fragment,
} from '@gumption-ui/jsx/jsx-dev-runtime';
import type { GumptionOtionJSX } from './jsx-namespace';
import { parseProps } from './parseProps';

export type { GumptionOtionJSX as JSX } from './jsx-namespace';
export { Fragment };

export function jsxDEV<T extends As>(
  type: T,
  props: Record<string, any>,
  key: string | undefined,
  isStaticChildren: boolean,
  source: {
    filename: string;
    lineNumber: number;
    columnNumber: number;
  },
  self: any,
): GumptionOtionJSX.Element {
  return internalJsxDEV(
    type,
    parseProps(type, props),
    key,
    isStaticChildren,
    source,
    self,
  );
}
