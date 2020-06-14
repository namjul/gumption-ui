import { createComponent, createHook, Component } from 'reakit-system';
import { As } from 'reakit-utils';
import cc from 'classcat';
import { css as toClassname } from 'otion';
import { PropsOf, Dict, Theme } from './types';
import {
  domElements,
  DOMElements,
  get,
  merge,
  toArray,
  objectKeys,
} from './utils';
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

interface QuarkOptions extends CssProps, ThemingProps {}

type ModifierStyle = { [section: string]: ThemedStyle };

type Config<T extends As, O> = {
  memo?: boolean;
  keys?: ReadonlyArray<any>;
  useHook?: Hook<O> | Array<Hook<O>>;
  baseStyle?: ThemedStyle;
  attrs?: Attrs<T>;
  themeKey?: string;
  variants?: ModifierStyle;
  sizes?: ModifierStyle;
};

function styled<T extends As, O, P>(
  component: T,
  config?: Config<T, QuarkOptions & O>,
) {
  const baseStyles = getBaseStyles(config);
  const modifierStyle = getModifierStyles(config);

  // const slotStyles = getSlotStyles(options);

  const useHook = createHook<QuarkOptions & O, HTMLProps>({
    ...(config?.useHook && {
      compose: toArray(config.useHook).map((hook) =>
        createHook({ useProps: hook }),
      ),
    }),
    useProps(options, htmlProps) {
      const theme = useTheme();
      const { _css = {}, css = {} } = options;

      const optionsWithTheme = { ...options, theme };

      /**
       * Lets collect the following styles:
       * I: base styles
       * II: modifier styles (sizes, variants)
       * II: slot styles
       */

      const computedStyles: ThemedStyle = {
        ...baseStyles(optionsWithTheme),
        ...modifierStyle(optionsWithTheme),
        // ...slotStyles(optionsWithTheme),
        ...merge(_css, css),
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
      if (config?.attrs) {
        computedProps = { ...computedProps, ...config.attrs };
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

  // TODO attach defaultProps from `component` and hoist static properties
  return createComponent<T, QuarkOptions & P & O>({
    as: component,
    useHook,
    memo: config?.memo,
    keys: ['css', '_css', ...(config?.keys ?? [])],
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
function getBaseStyles(config?: {
  themeKey?: string;
  baseStyle?: ThemedStyle;
}) {
  return (options?: Dict): ThemedStyle => ({
    // merging local and theme baseStyle to allow modifications on both locations
    ...(config?.baseStyle ?? {}),
    ...get(options?.theme, `components.${config?.themeKey}.baseStyle`, {}),
  });
}

const modifierMap = {
  sizes: 'size',
  variants: 'variant',
} as const;

/**
 * Users can provide modification styles
 * `sizes` and `variants` are supportd
 * @example
 * const Button = quark('button', {
 *   sizes: {
 *     small: {
 *       height: '1'
 *     },
 *     large: {
 *       height: '2'
 *     }
 *   }
 *   variants: {
      solid: {
        background: "pink",
        color: "white",
        "&:hover": {
          background: "darkpink",
        },
      },
      outline: {
        border: "2px solid red",
        color: "red",
        "&:hover": {
          background: "darkpink",
        },
      },
 *   }
 * })
 */
function getModifierStyles(config?: {
  themeKey?: string;
  variants?: ModifierStyle;
  sizes?: ModifierStyle;
}) {
  // TODO allow subComponents and functions
  const modifiers = objectKeys(modifierMap);
  return (options?: {
    variant?: string;
    size?: string;
    theme?: Theme;
  }): ThemedStyle => {
    let styles: ThemedStyle = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const modifier of modifiers) {
      const modifierProps = modifierMap[modifier];
      const value = options?.[modifierProps];

      if (!value) continue; // eslint-disable-line no-continue

      const modifierInConfig = config?.[modifier];

      const modifierStylesInConfig = modifierInConfig?.[value];

      // pick only a single source of modifier
      const styleObject =
        modifierStylesInConfig ??
        get(
          options?.theme,
          `components.${config?.themeKey}.${modifier}.${value}`,
          {},
        );

      styles = merge(styles, styleObject);
    }

    return styles;
  };
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
