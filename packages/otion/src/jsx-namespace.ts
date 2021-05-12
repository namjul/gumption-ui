/* eslint-disable @typescript-eslint/no-empty-interface, @typescript-eslint/no-namespace */

/**
 * [Steal like an artist](https://austinkleon.com/steal/)
 *
 * - https://github.com/system-ui/theme-ui/blob/fe978473039652bc685302c3b076ce8aa283d1d8/packages/core/src/jsx-namespace.ts
 * - https://github.com/emotion-js/emotion/blob/418daad9f7ac0eac88f206e3c4aee4e7aca7deb4/packages/react/types/jsx-namespace.d.ts
 * - https://github.com/reflexjs/reflexjs/blob/e5768a97c410fb0ef2fc0e792917654a9af1d41e/packages/reflexjs/src/types.ts#L254-L269
 */

import { StyleProps, CssProp } from './types';

type ReactJSXElement = JSX.Element;
type ReactJSXElementClass = JSX.ElementClass;
type ReactJSXElementAttributesProperty = JSX.ElementAttributesProperty;
type ReactJSXElementChildrenAttribute = JSX.ElementChildrenAttribute;
type ReactJSXLibraryManagedAttributes<C, P> = JSX.LibraryManagedAttributes<
  C,
  P
>;
type ReactJSXIntrinsicAttributes = JSX.IntrinsicAttributes;
type ReactJSXIntrinsicClassAttributes<T> = JSX.IntrinsicClassAttributes<T>;
type ReactJSXIntrinsicElements = JSX.IntrinsicElements;

export namespace GumptionJSX {
  export interface Element extends ReactJSXElement {}
  export interface ElementClass extends ReactJSXElementClass {}
  export interface ElementAttributesProperty
    extends ReactJSXElementAttributesProperty {}
  export interface ElementChildrenAttribute
    extends ReactJSXElementChildrenAttribute {}
  export type LibraryManagedAttributes<C, P> = ReactJSXLibraryManagedAttributes<
    C,
    P
  >;
  export interface IntrinsicAttributes extends ReactJSXIntrinsicAttributes {}
  export interface IntrinsicClassAttributes<T>
    extends ReactJSXIntrinsicClassAttributes<T> {}
  export type IntrinsicElements = {
    [K in keyof ReactJSXIntrinsicElements]: ReactJSXIntrinsicElements[K];
  };
}

type WidthConditionalCssProp<P> = 'className' extends keyof P
  ? string extends P['className']
    ? P & CssProp
    : P
  : P;

export namespace GumptionOtionJSX {
  export interface Element extends GumptionJSX.Element {}
  export interface ElementClass extends GumptionJSX.ElementClass {}
  export interface ElementAttributesProperty
    extends GumptionJSX.ElementAttributesProperty {}
  export interface ElementChildrenAttribute
    extends GumptionJSX.ElementChildrenAttribute {}
  export type LibraryManagedAttributes<C, P> = WidthConditionalCssProp<P> &
    GumptionJSX.LibraryManagedAttributes<C, P>;
  export interface IntrinsicAttributes
    extends GumptionJSX.IntrinsicAttributes {}
  export interface IntrinsicClassAttributes<T>
    extends GumptionJSX.IntrinsicClassAttributes<T> {}
  export type IntrinsicElements = {
    [K in keyof GumptionJSX.IntrinsicElements]: GumptionJSX.IntrinsicElements[K] &
      StyleProps &
      CssProp;
  };
}
