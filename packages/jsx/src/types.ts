export type ParseProps<
  P = Record<string, unknown>,
  Theme = Record<string, unknown>
> = P & {
  compileStyles?: (props: P, theme?: Theme) => React.HTMLAttributes<any>;
};
