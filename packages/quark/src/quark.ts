import { createComponent, createHook, Component } from 'reakit-system';
import { As, toArray } from 'reakit-utils';
import cc from 'classcat';
import deepmerge from 'deepmerge';
import { css as toClassname } from 'otion';
import { PropsOf, Theme } from './types';
import { domElements, DOMElements, get } from './utils';
import { interpolate, ThemedStyle } from './interpolate';
import { useTheme } from './ThemeContext';

type HTMLProps = React.HTMLAttributes<any> & React.RefAttributes<any>;

type Hook<O> = (options?: O, props?: HTMLProps) => HTMLProps;

type Attrs<T extends As> = PropsOf<T>;

type CssProps = {
  css?: ThemedStyle;
  _css?: ThemedStyle;
};

type ThemingProps = {
  variant?: string;
  size?: string;
};

type ModifierStyle = ThemedStyle | { [section: string]: ThemedStyle };

type Option<T extends As, O> = {
  memo?: boolean;
  keys?: ReadonlyArray<any>;
  useHook?: Hook<O> | Array<Hook<O>>;
  baseStyle?: ThemedStyle;
  attrs?: Attrs<T>;
  themeKey?: string;
};

export interface QuarkProps extends CssProps, ThemingProps {
  children?: React.ReactNode;
}

function styled<T extends As, O, P>(
  component: T,
  options?: Option<T, QuarkProps & O>,
) {
  const baseStyles = getBaseStyles(options);

  const useHook = createHook<QuarkProps & O, HTMLProps>({
    ...(options?.useHook && {
      compose: toArray(options.useHook).map((hook) =>
        createHook({ useProps: hook }),
      ),
    }),
    useProps({ _css = {}, css = {} }, htmlProps) {
      const theme = useTheme();

      const computedStyles: ThemedStyle = {
        ...baseStyles(theme),
        ...deepmerge(_css, css),
      };

      let computedProps = { ...htmlProps };

      /**
       * Users can provide  html attributes which will be passed to the underlying dom element.
       * @example
       * const Button = quark('button', {
       *   attr: {
       *     type: 'submit'
       *   }
       * })
       */
      if (options?.attrs) {
        computedProps = { ...computedProps, ...options.attrs };
      }

      const { className, ...elementProps } = computedProps;

      return {
        className: cc([
          className,
          toClassname(interpolate(computedStyles)(theme)),
        ]),
        ...elementProps,
      };
    },
  });

  return createComponent<T, QuarkProps & P & O>({
    as: component,
    useHook,
    memo: options?.memo,
    keys: ['css', '_css', ...(options?.keys ?? [])],
  });
}

/**
 * Users can provide base styles
 * @example
 * const Button = quark('button', {
 *   baseStyle: {
 *     margin: 0,
 *     color: 'blue.1'
 *   }
 * })
 */
function getBaseStyles(options?: {
  themeKey?: string;
  baseStyle?: ThemedStyle;
}) {
  return (theme?: Theme): ThemedStyle => ({
    ...(options?.baseStyle ?? {}),
    ...get(theme, `components.${options?.themeKey}.baseStyle`, {}),
  });
}

/**
 * Creates a component
 *
 * @example
 * import { quark } from '@gumption-ui/quark'
 *
 * const Box = quark('div', { useHook: useBox, keys: ['padding'] })
 *
 * @param component
 * @param options
 *
 */

type QuarkJSXElements = {
  [Tag in DOMElements]: Component<Tag, {}>;
};

export const quark = (styled as unknown) as typeof styled & QuarkJSXElements;

domElements.forEach((tag) => {
  quark[tag] = styled(tag);
});
