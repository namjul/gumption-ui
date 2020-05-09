export type As = React.ElementType;

export type QuarkProps = {
  __css?: {};
  css?: {};
};

export type PropsOf<T extends As> = React.ComponentPropsWithRef<T>;

export type PropsWithAs<P, T extends As> = { as?: T } & P &
  Omit<PropsOf<T>, 'as' | keyof P>;

export type Factory<T extends As, P> =
  | ((props: PropsOf<T> & { as?: As } & P & QuarkProps) => JSX.Element)
  | (<TT extends As = T>(
      props: PropsWithAs<PropsOf<T>, TT> & P & QuarkProps,
    ) => JSX.Element);

export type QuarkComponent<T extends As, P = {}> = Factory<T, P> & {
  displayName?: string;
  defaultProps?: Partial<PropsOf<T> & P & QuarkProps>;
};

export type Dict<T = any> = Record<string, T>; // eslint-disable-line @typescript-eslint/no-explicit-any

export type RenderProp<P = {}> = (props: P) => React.ReactElement;
