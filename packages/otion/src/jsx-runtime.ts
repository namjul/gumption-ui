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
  jsx as reactJsx,
  // @ts-ignore
  jsxs as reactJsxs,
} from 'react/jsx-runtime';
import { parseProps } from './parseProps';
import type { GumptionOtionJSX } from './jsx-namespace';

export type { GumptionOtionJSX as JSX };
export { Fragment };

export function jsx<T extends As>(
  type: T,
  props: Record<string, any>,
  key: string | number,
): GumptionOtionJSX.Element {
  const nextProps = integralParseProps(type, parseProps(type, props));
  return reactJsx(
    hasGumptionProps(nextProps) ? Gumption : type,
    nextProps,
    key,
  );
}

export function jsxs<T extends As>(
  type: T,
  props: Record<string, any>,
  key: string | number,
): GumptionOtionJSX.Element {
  const nextProps = integralParseProps(type, parseProps(type, props));
  return reactJsxs(
    hasGumptionProps(nextProps) ? Gumption : type,
    nextProps,
    key,
  );
}
