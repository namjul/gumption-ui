import * as CSS from 'csstype';
import type { ThemeOrAny } from '@gumption-ui/interpolate/theme';
import { LiteralUnion } from '@gumption-ui/utils';

export type CSSProperties = CSS.Properties<string | number>;

export type Tokens<T extends keyof ThemeOrAny> = Extract<
  keyof ThemeOrAny[T],
  string | number
>;
export type Matchers = Tokens<'matchers'>;
export type Shorthands = Tokens<'shorthands'>;
export type Aliases = Tokens<'aliases'>;
export type Variants = LiteralUnion<Tokens<'variants'>, string>;

export type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
];

export type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object // eslint-disable-line @typescript-eslint/ban-types
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : '';

// type NestedObjectType = {
//   a: string;
//   b: string;
//   colors: {
//     primary: 'tomato';
//     secondary: 'cyan';
//     gray: [
//       '#F8F9F9',
//       '#EDEFF1',
//       '#DDE0E4',
//       '#CBD1D6',
//       '#B2BAC2',
//       '#939BA3', // base
//       '#7A838C',
//       '#636d75',
//       '#515961',
//       '#343b40',
//     ];
//   };
//   nest: {
//     c: string;
//   };
//   otherNest: {
//     c: string;
//   };
// };
// type NestedObjectPaths1 = Paths<NestedObjectType>;
// type NestedObjectPaths2 = keyof NestedObjectType;
//
// const x: NestedObjectPaths2 = 'nest';
// console.log(x);
