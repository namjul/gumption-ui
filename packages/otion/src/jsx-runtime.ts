/* eslint-disable @typescript-eslint/ban-ts-comment */

import { As } from '@gumption-ui/utils';
import {
  jsx as internalJsx,
  jsxs as internalJsxs,
  Fragment,
} from '@gumption-ui/jsx/jsx-runtime';
import type { GumptionOtionJSX } from './jsx-namespace';
import { parseProps } from './parseProps';

export type { GumptionOtionJSX as JSX } from './jsx-namespace';
export { Fragment };

export function jsx<T extends As>(
  type: T,
  props: Record<string, any>,
  key: string | number,
): GumptionOtionJSX.Element {
  return internalJsx(type, parseProps(type, props), key);
}

export function jsxs<T extends As>(
  type: T,
  props: Record<string, any>,
  key: string | number,
): GumptionOtionJSX.Element {
  return internalJsxs(type, parseProps(type, props), key);
}
