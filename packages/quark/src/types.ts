import * as CSS from 'csstype';
import { As } from 'reakit-utils';
import { ThemeOrAny } from '@gumption-ui/quark/theme';

export type Dict<T = any> = Record<string, T>;

export type FirstParameters<T> = T extends (arg: infer T) => any ? T : never;

export type UnionStringArray<T extends Readonly<string[]>> = T[number];

export type PropsOf<T extends As> = React.ComponentPropsWithRef<T>;

export type CSSProperties = CSS.Properties<string | number>;

export type ResponsiveStyleValue<T> = T | Array<T>;

export type Tokens<T extends keyof ThemeOrAny> = Extract<
  keyof ThemeOrAny[T],
  string | number
>;
export type Matchers = Tokens<'matchers'>;
export type Shorthands = Tokens<'shorthands'>;
export type Aliases = Tokens<'aliases'>;

export type Theme = Partial<ThemeOrAny>;
