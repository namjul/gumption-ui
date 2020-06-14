import { createComponent, createHook, Component } from 'reakit-system';
import { As, toArray } from 'reakit-utils';
import cc from 'classcat';
import deepmerge from 'deepmerge';
import { useStyling } from './useStyling';
import { ThemedStyle } from './types';

type HTMLProps = React.HTMLAttributes<any> & React.RefAttributes<any>;

type Hook<O> = (options?: O, props?: HTMLProps) => HTMLProps;

type PropsOf<T extends As> = React.ComponentPropsWithRef<T>;

type Attrs<T extends As> = PropsOf<T>;

type Option<T extends As, O> = {
  memo?: boolean;
  keys?: ReadonlyArray<any>;
  useHook?: Hook<O> | Array<Hook<O>>;
  baseStyle?: ThemedStyle;
  attrs?: Attrs<T>;
};

type CssProps = {
  css?: ThemedStyle;
  _css?: ThemedStyle;
};

type ThemingProps = {
  variant?: string;
  size?: string;
};

export interface QuarkProps extends CssProps, ThemingProps {
  children?: React.ReactNode;
}

function styled<T extends As, O, P>(
  component: T,
  options?: Option<T, QuarkProps & O>,
) {
  const useHook = createHook<QuarkProps & O, HTMLProps>({
    ...(options?.useHook && {
      compose: toArray(options.useHook).map((hook) =>
        createHook({ useProps: hook }),
      ),
    }),
    useProps(_options, htmlProps) {
      const toClassName = useStyling();
      const { css = {}, _css = {} } = _options;

      let computedStyles = deepmerge(_css, css);

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
      if (options?.baseStyle) {
        computedStyles = deepmerge(options.baseStyle, computedStyles);
      }

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
        className: cc([className, toClassName(computedStyles)]),
        ...elementProps,
      };
    },
    keys: ['css', '_css'],
  });

  return createComponent<T, QuarkProps & P & O>({
    as: component,
    useHook,
    memo: options?.memo,
    keys: options?.keys,
  });
}

const domElements = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'b',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'button',
  'caption',
  'cite',
  'circle',
  'code',
  'col',
  'dd',
  'del',
  'details',
  'dfn',
  'div',
  'dl',
  'dt',
  'em',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'i',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'main',
  'mark',
  'nav',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'path',
  'picture',
  'pre',
  'q',
  'rect',
  's',
  'svg',
  'section',
  'select',
  'small',
  'span',
  'strong',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'tr',
  'u',
  'ul',
  'video',
] as const;

export type UnionStringArray<T extends Readonly<string[]>> = T[number];
export type DOMElements = UnionStringArray<typeof domElements>;

type QuarkJSXElements = {
  [Tag in DOMElements]: Component<Tag, {}>;
};

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

export const quark = (styled as unknown) as typeof styled & QuarkJSXElements;

domElements.forEach((tag) => {
  quark[tag] = styled(tag);
});
