import { ThemeOrAny } from '@gumption-ui/quark/theme';

export type Tokens<T extends keyof ThemeOrAny> = Extract<
  keyof ThemeOrAny[T],
  string | number
>;
