import * as React from 'react';
import { As } from '@gumption-ui/utils';
import { jsx as internalJsx } from '@gumption-ui/jsx';
import { GumptionOtionJSX } from './jsx-namespace';
import { parseProps } from './parseProps';

export * from '@gumption-ui/integral';
export type { GumptionOtionJSX } from './jsx-namespace';
export type { CssProp } from './types';

/* eslint-disable-next-line import/export -- intentionally exporting jsx functin and namespace with the same name */
export function jsx<T extends As>(
  type: T,
  props: Record<string, any>,
  ...children: React.ReactNode[]
): JSX.Element {
  return internalJsx(type, parseProps(type, props), children);
}

/* eslint-disable-next-line import/export -- intentionally exporting jsx function and namespace with the same name */
export declare namespace jsx {
  export namespace JSX {
    export interface Element extends GumptionOtionJSX.Element {}
    export interface ElementClass extends GumptionOtionJSX.ElementClass {}
    export interface ElementAttributesProperty
      extends GumptionOtionJSX.ElementAttributesProperty {}
    export interface ElementChildrenAttribute
      extends GumptionOtionJSX.ElementChildrenAttribute {}
    export type LibraryManagedAttributes<
      C,
      P
    > = GumptionOtionJSX.LibraryManagedAttributes<C, P>;
    export interface IntrinsicAttributes
      extends GumptionOtionJSX.IntrinsicAttributes {}
    export interface IntrinsicClassAttributes<T>
      extends GumptionOtionJSX.IntrinsicClassAttributes<T> {}
    export type IntrinsicElements = GumptionOtionJSX.IntrinsicElements;
  }
}
