import * as CSS from 'csstype';
import { ThemeOrAny } from '@gumption-ui/css/theme';

export type CSSProperties = CSS.Properties<string | number>;

export type ResponsiveStyleValue<T> = T | Array<T>;

export type Tokens<T extends keyof ThemeOrAny> = Extract<
  keyof ThemeOrAny[T],
  string | number
>;
export type Matchers = Tokens<'matchers'>;
export type Shorthands = Tokens<'shorthands'>;
export type Aliases = Tokens<'aliases'>;
