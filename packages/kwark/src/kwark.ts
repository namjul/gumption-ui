import * as React from 'react';
import {
  createComponent,
  createHook,
  Component,
  useCreateElement,
} from 'reakit-system';
import { As } from '@gumption-ui/utils';
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

type KwarkOptions = Record<string, any>;

type Config<O> = {
  name?: string;
  memo?: boolean;
  useHook?: Hook<O>;
  useCreateElement?: typeof useCreateElement;
};

/**
 * Creates a component
 *
 * @example
 * import { kwark, createHook } from '@gumption-ui/kwark'
 *
 * const useCustomHook = createHook({ ... })
 *
 * const MyComp = kwark('div', { useHook: useCustomHook })
 *
 * @param component
 * @param options
 *
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types -- implicit works perfectly
function styled<T extends As, O extends KwarkOptions>(
  component: T,
  config: Config<O> = {},
) {
  const name =
    config.name ||
    (typeof component === 'string'
      ? component
      : // @ts-expect-error TODO: remove comment when upgrading to typescript 4.3
        component.displayName || component.name || 'Component');

  const compose = [];

  if (config.useHook) {
    compose.push(config.useHook);
  }

  const useHook = createHook<O, KwarkHTMLProps>({
    name,
    compose,
  });

  const Comp = createComponent<T, O>({
    as: component,
    memo: config.memo,
    useHook,
    useCreateElement: config.useCreateElement,
  });

  (Comp as any).defaultProps = (component as any).defaultProps;

  // hoist all non-react statics attached to the `component`
  hoist(Comp, component as React.ComponentType<any>);

  return Comp;
}

type KwarkJSXElements = {
  [Tag in DOMElements]: Component<Tag, KwarkOptions>;
};

export const kwark = (styled as unknown) as typeof styled & KwarkJSXElements;

domElements.forEach((tag) => {
  kwark[tag] = kwark(tag);
});

export { createHook };
