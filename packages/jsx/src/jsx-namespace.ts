/**
 * Imitation of:
 * https://github.com/system-ui/theme-ui/blob/fe978473039652bc685302c3b076ce8aa283d1d8/packages/core/src/jsx-namespace.ts
 * https://github.com/emotion-js/emotion/blob/418daad9f7ac0eac88f206e3c4aee4e7aca7deb4/packages/react/types/jsx-namespace.d.ts
 */

import { CssProp } from './types';

type WithConditionalSxProp<P> = 'className' extends keyof P
  ? string extends P['className']
    ? P & CssProp
    : P
  : P;

// unpack all here to avoid infinite self-referencing when defining our own JSX namespace
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
  export type LibraryManagedAttributes<C, P> = WithConditionalSxProp<P> &
    ReactJSXLibraryManagedAttributes<C, P>;
  export interface IntrinsicAttributes extends ReactJSXIntrinsicAttributes {}
  export interface IntrinsicClassAttributes<T>
    extends ReactJSXIntrinsicClassAttributes<T> {}
  export type IntrinsicElements = {
    [K in keyof ReactJSXIntrinsicElements]: ReactJSXIntrinsicElements[K] &
      CssProp;
  };
}
