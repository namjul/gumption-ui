import * as React from 'react';
import { createComponent, createHook, Component } from 'reakit-system';
import { jsx, CssProp } from '@gumption-ui/jsx';
import { isObject, As } from '@gumption-ui/utils';
import hoist from 'hoist-non-react-statics';
import { domElements, DOMElements } from './utils';

export type KwarkHTMLProps = React.HTMLAttributes<any> &
  React.RefAttributes<any> & {
    /**
     * Function returned by the hook to wrap the element to which html props
     * will be passed.
     */
    wrapElement?: (element: React.ReactNode) => React.ReactNode;
  };

type Hook<O = any, P = any> = {
  (options?: O, htmlProps?: P, unstable_ignoreUseOptions?: boolean): P;
  unstable_propsAreEqual: (prev: O & P, next: O & P) => boolean;
  __keys: ReadonlyArray<any>;
  __useOptions: (options: O, htmlProps: P) => O;
};

export interface KwarkOptions extends CssProp {} // eslint-disable-line @typescript-eslint/no-empty-interface -- otherwise completion would show CssProp instead of KwarkOptions

type Config<O> = {
  memo?: boolean;
  useHook?: Hook<O>;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types -- implicit works perfectly
function styled<T extends As, O extends KwarkOptions & KwarkHTMLProps>(
  component: T,
  config?: Config<O>,
) {
  const name =
    (isObject(component) ? component.displayName : component) || 'Kwark';

  const StyledComponent = createComponent<T, O>({
    as: component,
    memo: config?.memo,
    useHook: config?.useHook,
    useCreateElement: jsx,
  });

  StyledComponent.displayName = name;

  (StyledComponent as any).defaultProps = (component as any).defaultProps;

  // hoist all non-react statics attached to the `component`
  hoist(StyledComponent, component as React.ComponentType<any>);

  return StyledComponent;
}

/**
 * Creates a component
 *
 * @example
 * import { kwark } from '@gumption-ui/kwark'
 *
 * const Box = kwark('div', { useHook: useBox })
 *
 * @param component
 * @param options
 *
 */

type KwarkJSXElements = {
  [Tag in DOMElements]: Component<Tag, KwarkOptions>;
};

export const kwark = (styled as unknown) as typeof styled & KwarkJSXElements;

domElements.forEach((tag) => {
  kwark[tag] = kwark(tag);
});

export { createHook };
