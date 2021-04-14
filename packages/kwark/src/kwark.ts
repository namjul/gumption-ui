import * as React from 'react';
import {
  createComponent,
  createHook,
  Component,
  useCreateElement,
} from 'reakit-system';
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

export type KwarkOptions = {
  variant: string;
  size: string;
};

type Config = {
  memo?: boolean;
  useHook?: Hook;
  themeKey?: string;
  useCreateElement?: typeof useCreateElement;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types -- implicit works perfectly
function styled<T extends As, O extends KwarkOptions>(
  component: T,
  config?: Config,
) {
  const name =
    (isObject(component) ? component.displayName : component) || 'Kwark';

  const useKwark = createHook<O, KwarkHTMLProps>({});

  const compose = [useKwark];

  if (config?.useHook) {
    compose.push(config.useHook);
  }

  const useHook = createHook<O, KwarkHTMLProps>({
    name,
    compose,
  });

  const StyledComponent = createComponent<T, O & KwarkHTMLProps>({
    as: component,
    memo: config?.memo,
    useHook,
    useCreateElement: config?.useCreateElement,
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
  [Tag in DOMElements]: Component<Tag, KwarkOptions & KwarkHTMLProps>;
};

export const kwark = (styled as unknown) as typeof styled & KwarkJSXElements;

domElements.forEach((tag) => {
  const x = kwark(tag, {
    themeKey: tag,
  });
  kwark[tag] = x;
});

export { createHook };
