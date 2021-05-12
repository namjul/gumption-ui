/* eslint-disable @typescript-eslint/ban-ts-comment */

import { As } from '@gumption-ui/utils';
import {
  parseProps as integralParseProps,
  Gumption,
  hasGumptionProps,
} from '@gumption-ui/integral';
import {
  // @ts-ignore
  Fragment,
  // @ts-ignore
  jsxDEV as reactJsxDEV,
} from 'react/jsx-dev-runtime';
import { parseProps } from './parseProps';
import type { GumptionOtionJSX } from './jsx-namespace';

export type { GumptionOtionJSX as JSX };
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
  const nextProps = integralParseProps(type, parseProps(type, props));
  return reactJsxDEV(
    hasGumptionProps(nextProps) ? Gumption : type,
    nextProps,
    key,
    isStaticChildren,
    source,
    self,
  );
}
