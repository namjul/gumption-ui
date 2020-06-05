import { ThemeOrAny } from '@gumption-ui/quark/theme';
import * as CSS from 'csstype';
import { css } from 'otion';

export type FirstParameters<T> = T extends (arg: infer T) => any ? T : never;

export type CSSProperties = CSS.Properties<string | number>;
export type ScopedCSSProperties = Omit<CSSProperties, 'all'>;
export type ScopedCSSRules = FirstParameters<typeof css>;

export type Tokens<T extends keyof ThemeOrAny> = Extract<
  keyof ThemeOrAny[T],
  string | number
>;

export type ObjectOrArray<T> = T[] | { [key: string]: T };
