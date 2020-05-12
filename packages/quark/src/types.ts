export type As = React.ElementType;

type QuarkProps = {
  __css?: {};
  css?: {};
};

export type PropsOf<T extends As> = React.ComponentPropsWithRef<T>;

export type WithAs<P, T extends As> = P &
  Omit<PropsOf<T>, 'as' | keyof P> & {
    as?: T;
  };

/*
 * Source: https://github.com/chakra-ui/chakra-ui/blob/dev-ts/packages/system/src/system.types.ts#L165
 */

type RegularComponent<T extends As, P> = (
  props: PropsOf<T> & P & { as?: As } & QuarkProps,
) => JSX.Element;

type ExtensibleComponent<T extends As, P> = <TT extends As = T>(
  props: WithAs<PropsOf<T>, TT> & P & QuarkProps,
) => JSX.Element;

export type Component<T extends As, P> =
  | RegularComponent<T, P>
  | ExtensibleComponent<T, P>;

export type QuarkComponent<T extends As, P = {}> = Component<T, P> & {
  displayName?: string;
  defaultProps?: Partial<PropsOf<T> & P & QuarkProps>;
};

export type Dict<T = any> = Record<string, T>; // eslint-disable-line @typescript-eslint/no-explicit-any

export type RenderProp<P = {}> = (props: P) => React.ReactElement;
