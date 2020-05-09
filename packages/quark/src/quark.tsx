import * as React from 'react';
import hoist from 'hoist-non-react-statics';
import { cx } from '@emotion/css';
import memoize from '@emotion/memoize';
import isPropValid from '@emotion/is-prop-valid';
import { Dict, As, QuarkComponent, RenderProp } from './types';
import { useStyling } from './useStyling';

function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

function isRenderProp(children: unknown): children is RenderProp {
  return typeof children === 'function';
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function createShouldForwardProp(
  props: Array<string> = [],
): (prop: string) => boolean {
  const regex = new RegExp(`^(${props.join('|')})$`);
  return memoize<boolean>((prop) => isPropValid(prop) && !regex.test(prop));
}

const shouldForwardProp = createShouldForwardProp();

function filterProps(props: Dict): Dict {
  const validProps: Dict = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in props) {
    if (!shouldForwardProp(prop)) continue; // eslint-disable-line no-continue
    validProps[prop] = props[prop];
  }
  return validProps;
}

export function quark<T extends As, P = {}>(
  component: T,
): QuarkComponent<T, P> {
  const Quark = React.forwardRef(
    ({ as, children, ...props }: any, ref: React.Ref<any>) => {
      const toClassName = useStyling();
      const computedStyles = { ...(props.css || {}), ...(props.__css || {}) };

      const Component = as || component;
      const isTag = isString(Component);
      const computedProps: Dict = isTag ? filterProps(props) : props;

      /**
       * This helps to prevent scenarios where no styles was passed
       * to the component but emotion generate a `css-0` className.
       */
      if (!isEmptyObject(computedStyles)) {
        computedProps.className = cx(
          props.className,
          toClassName(computedStyles),
        );
      }

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
