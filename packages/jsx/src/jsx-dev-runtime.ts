/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  // @ts-ignore
  Fragment,
  // @ts-ignore
  jsxDEV as reactJsxDEV,
} from 'react/jsx-dev-runtime';
import { As } from '@gumption-ui/utils';
import { Gumption, parseProps, hasGumptionProps } from './gumption-element';
import type { GumptionJSX } from './jsx-namespace';
import { ParseProps } from './types';

export type { GumptionJSX as JSX } from './jsx-namespace';
export { Fragment };

export const jsxDEV = <T extends As>(
  type: T,
  props: ParseProps<Record<string, unknown>>,
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
  return reactJsxDEV(
    hasGumptionProps(nextProps) ? Gumption : type,
    nextProps,
    key,
    isStaticChildren,
    source,
    self,
  );
};
