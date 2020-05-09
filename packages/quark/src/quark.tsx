import * as React from 'react';
import hoist from 'hoist-non-react-statics';
import { Dict, As, QuarkComponent, RenderProp } from './types';

function isRenderProp(children: unknown): children is RenderProp {
  return typeof children === 'function';
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function quark<T extends As, P = {}>(
  component: T,
): QuarkComponent<T, P> {
  const Quark = React.forwardRef(
    ({ as, children, ...props }: any, ref: React.Ref<any>) => {
      const Component = as || component;
      const isTag = isString(Component);
      const computedProps: Dict = isTag ? props : props;

      if (isRenderProp(children)) {
        return children(computedProps);
      }

      return (
        <Component ref={ref} {...computedProps}>
          {children}
        </Component>
      );
    },
  );

  Quark.displayName = 'Element';

  Quark.defaultProps = (component as any).defaultProps;

  const Component = hoist(Quark, component as React.ComponentType<any>);

  return (Component as unknown) as QuarkComponent<T, P>;
}
