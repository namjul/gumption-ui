import * as React from 'react';
import { createComponent, createHook, Component } from 'reakit-system';
import { As } from 'reakit-utils';
import cc from 'classcat';
import { css as toClassname } from 'otion';
import { PropsOf, Dict, Theme } from './types';
import { domElements, DOMElements, get, merge, objectKeys } from './utils';
import { interpolate, ThemedStyle } from './interpolate';
import { useTheme } from './ThemeContext';
import { SlotProvider, useSlotStyles } from './Slots';

type Attrs<T extends As> = PropsOf<T>;

type CssProps = {
  css?: ThemedStyle;
  _css?: ThemedStyle;
};

type ThemingProps = {
  variant?: string;
  size?: string;
};

export interface QuarkOptions extends CssProps, ThemingProps {}

export type QuarkHTMLProps = React.HTMLAttributes<any> &
  React.RefAttributes<any> & {
    /**
     * Function returned by the hook to wrap the element to which html props
     * will be passed.
     */
    wrapElement?: (element: React.ReactNode) => React.ReactNode;
  };

type ModifierStyle = { [section: string]: ThemedStyle };

type Config<T extends As, O, P> = {
  memo?: boolean;
  keys?: ReadonlyArray<any>;
  useHook?: {
    useOptions?: (options: O, htmlProps: P) => O;
    useProps?: (options: O, htmlProps: P) => P;
  };
  baseStyle?: ThemedStyle;
  attrs?: Attrs<T>;
  themeKey?: string;
  variants?: ModifierStyle;
  sizes?: ModifierStyle;
};

function styled<T extends As, O extends QuarkOptions, P extends QuarkHTMLProps>(
  component: T,
  config?: Config<T, O, P>,
) {
  const [componentName, subComponentName] = config?.themeKey?.split('.') ?? [];
  const name =
    subComponentName ??
    componentName ??
    (typeof component === 'string' && component) ??
    'Quark';

  const baseStyles = getBaseStyles(config);
  const modifierStyle = getModifierStyles(config);

  const useQuark = createHook<QuarkOptions, QuarkHTMLProps>({
    keys: ['css', '_css', 'variant', 'size'],
    useProps(options, { wrapElement: htmlWrapElement, ...htmlProps }) {
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
        ...useSlotStyles(name),
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

      const slots = get(
        theme,
        `components.${config?.themeKey}.slots`,
        undefined,
      );

      const wrapElement = React.useCallback(
        (element) => {
          if (htmlWrapElement) {
            element = htmlWrapElement(element); // eslint-disable-line no-param-reassign
          }
          if (slots) {
            return <SlotProvider slots={slots}>{element}</SlotProvider>;
          }
          return element;
        },
        [slots, htmlWrapElement],
      );

      return {
        className: cc([
          className,
          toClassname(interpolate(computedStyles)(theme)),
        ]),
        // Better classNames for debugging
        'data-component': name,
        wrapElement,
        ...elementProps,
      };
    },
  });

  const useHook = createHook<QuarkOptions, QuarkHTMLProps>({
    name,
    compose: [
      createHook<O, P>(
        config?.useHook ? { keys: config.keys, ...config.useHook } : {},
      ),
      useQuark,
    ],
  });

  // TODO attach defaultProps from `component` and hoist static properties
  return createComponent({
    as: component,
    useHook,
    memo: config?.memo,
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
  // TODO functions
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
