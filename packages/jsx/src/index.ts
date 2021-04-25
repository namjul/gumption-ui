import * as React from 'react';
import { As } from '@gumption-ui/utils';
import { GumptionJSX } from './jsx-namespace';
import { Gumption, parseProps, hasGumptionProps } from './gumption-element';
import { ParseProps } from './types';

export * from '@gumption-ui/integral';
export type { GumptionJSX } from './jsx-namespace';
export type { ParseProps } from './types';

/* eslint-disable-next-line import/export -- intentionally exporting jsx functin and namespace with the same name */
export function jsx<T extends As>(
  type: T,
  props: ParseProps<Record<string, unknown>>,
  ...children: React.ReactNode[]
): JSX.Element {
  const nextProps = parseProps(type, props);
  return React.createElement(
    hasGumptionProps(nextProps) ? Gumption : type,
    nextProps,
    children,
  );
}

/* eslint-disable-next-line import/export -- intentionally exporting jsx functin and namespace with the same name */
export declare namespace jsx {
  export namespace JSX {
    export interface Element extends GumptionJSX.Element {}
    export interface ElementClass extends GumptionJSX.ElementClass {}
    export interface ElementAttributesProperty
      extends GumptionJSX.ElementAttributesProperty {}
    export interface ElementChildrenAttribute
      extends GumptionJSX.ElementChildrenAttribute {}
    export type LibraryManagedAttributes<
      C,
      P
    > = GumptionJSX.LibraryManagedAttributes<C, P>;
    export interface IntrinsicAttributes
      extends GumptionJSX.IntrinsicAttributes {}
    export interface IntrinsicClassAttributes<T>
      extends GumptionJSX.IntrinsicClassAttributes<T> {}
    export type IntrinsicElements = GumptionJSX.IntrinsicElements;
  }
}
