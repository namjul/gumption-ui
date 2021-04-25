/**
 * Imitation of:
 * https://github.com/system-ui/theme-ui/blob/fe978473039652bc685302c3b076ce8aa283d1d8/packages/core/src/jsx-namespace.ts
 * https://github.com/emotion-js/emotion/blob/418daad9f7ac0eac88f206e3c4aee4e7aca7deb4/packages/react/types/jsx-namespace.d.ts
 */

import { GumptionJSX } from '@gumption-ui/jsx';
import { CssProp } from './types';

type WidthCOnditionalCssProp<P> = 'className' extends keyof P
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
  export type LibraryManagedAttributes<C, P> = WidthCOnditionalCssProp<P> &
    GumptionJSX.LibraryManagedAttributes<C, P>;
  export interface IntrinsicAttributes
    extends GumptionJSX.IntrinsicAttributes {}
  export interface IntrinsicClassAttributes<T>
    extends GumptionJSX.IntrinsicClassAttributes<T> {}
  export type IntrinsicElements = {
    [K in keyof GumptionJSX.IntrinsicElements]: GumptionJSX.IntrinsicElements[K] &
      CssProp;
  };
}
