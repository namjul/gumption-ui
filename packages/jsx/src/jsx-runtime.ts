/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  // @ts-ignore
  Fragment,
  // @ts-ignore
  jsx as reactJsx,
  // @ts-ignore
  jsxs as reactJsxs,
} from 'react/jsx-runtime';
import { As, PropsOf } from '@gumption-ui/utils';
import { Gumption } from './Gumption';
import type { GumptionJSX } from './jsx-namespace';
import { hasOwnProperty } from './utils';

export type { GumptionJSX as JSX } from './jsx-namespace';
export { Fragment };

export function jsx<T extends As>(
  type: T,
  props: PropsOf<T>,
  key: string | number,
): GumptionJSX.Element {
  if (!hasOwnProperty.call(props, 'css')) {
    return reactJsx(type, props, key);
  }

  return reactJsx(
    Gumption,
    {
      typePropName: type,
      ...props,
    },
    key,
  );
}

export function jsxs<T extends As>(
  type: T,
  props: PropsOf<T>,
  key: string | number,
): GumptionJSX.Element {
  if (!hasOwnProperty.call(props, 'css')) {
    return reactJsxs(type, props, key);
  }

  return reactJsxs(
    Gumption,
    {
      typePropName: type,
      ...props,
    },
    key,
  );
}
