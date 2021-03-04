import * as React from 'react';
import { As, PropsOf } from '@gumption-ui/utils';
import { GumptionJSX } from './jsx-namespace';
import { Gumption } from './Gumption';
import { hasOwnProperty } from './utils';

export * from './theming';
export type { GumptionJSX } from './jsx-namespace';

/* eslint-disable-next-line import/export -- intentionally exporting jsx functin and namespace with the same name */
export function jsx<T extends As>(
  type: T,
  props: PropsOf<T>,
  ...children: React.ReactNode[]
): JSX.Element {
  // TODO strings in `css` are not allowed https://github.com/emotion-js/emotion/blob/master/packages/react/src/emotion-element.js#L25

  // eslint-disable-next-line prefer-rest-params -- in this case the parameters fit 100%
  const args: any = arguments;

  if (props == null || !hasOwnProperty.call(props, 'css')) {
    return React.createElement.apply(undefined, args);
  }

  return React.createElement(
    Gumption,
    {
      typePropName: type,
      ...props,
    },
    ...children,
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
