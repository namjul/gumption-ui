import * as React from 'react';
import { As, isRenderProp } from '@gumption-ui/utils';
import { GumptionJSX } from './jsx-namespace';
import { Gumption } from './Gumption';
import { hasOwnProperty } from './utils';
import { parseProps } from './parseProps';

export type { GumptionJSX } from './jsx-namespace';
export type { CssProp } from './types';

/* eslint-disable-next-line import/export -- intentionally exporting jsx functin and namespace with the same name */
export function jsx<T extends As>(
  type: T,
  props: Record<string, any>,
  ...children: React.ReactNode[]
): JSX.Element {
  // TODO strings in `css` are not allowed https://github.com/emotion-js/emotion/blob/master/packages/react/src/emotion-element.js#L25

  // eslint-disable-next-line prefer-rest-params -- in this case the parameters fit 100%
  const args: any = arguments;

  const nextProps = parseProps(type, props);

  if (nextProps == null || !hasOwnProperty.call(nextProps, 'css')) {
    if (typeof type === 'string' && isRenderProp(children)) {
      return children(nextProps || {});
    }

    return React.createElement.apply(undefined, args); // eslint-disable-line prefer-spread
  }

  return React.createElement(Gumption, nextProps, children);
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
