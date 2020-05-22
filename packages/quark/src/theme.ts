export const emptyTokens = {
  scales: {},
  shorthands: {},
  aliases: {},
  matchers: {},
} as const;

type AnyIfEmpty<T extends object> = keyof T extends never ? any : T;

export type ThemeOrAny = AnyIfEmpty<typeof emptyTokens>;

export type Tokens<T extends keyof ThemeOrAny> = Extract<
  keyof ThemeOrAny[T],
  string | number
>;
