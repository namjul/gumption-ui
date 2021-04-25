/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  // @ts-ignore
  Fragment,
  // @ts-ignore
  jsx as reactJsx,
  // @ts-ignore
  jsxs as reactJsxs,
} from 'react/jsx-runtime';
import { As } from '@gumption-ui/utils';
import { Gumption, parseProps, hasGumptionProps } from './gumption-element';
import type { GumptionJSX } from './jsx-namespace';
import { ParseProps } from './types';

export type { GumptionJSX as JSX } from './jsx-namespace';
export { Fragment };

export function jsx<T extends As>(
  type: T,
  props: ParseProps<Record<string, unknown>>,
  key: string | number,
): GumptionJSX.Element {
  const nextProps = parseProps(type, props);
  return reactJsx(
    hasGumptionProps(nextProps) ? Gumption : type,
    nextProps,
    key,
  );
}

export function jsxs<T extends As>(
  type: T,
  props: ParseProps<Record<string, unknown>>,
  key: string | number,
): GumptionJSX.Element {
  const nextProps = parseProps(type, props);
  return reactJsxs(
    hasGumptionProps(nextProps) ? Gumption : type,
    nextProps,
    key,
  );
}
