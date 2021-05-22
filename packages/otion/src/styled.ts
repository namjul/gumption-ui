import { useMemo, useRef } from 'react';
import isEqual from 'react-fast-compare';
import {
  kwark as rawKwark,
  Component,
  createHook,
  KwarkHTMLProps,
  KwarkConfig,
} from '@gumption-ui/kwark';
import { domElements, get, merge } from '@gumption-ui/utils';
import type { As, DOMElements, Dict } from '@gumption-ui/utils';
import { Tokens } from '@gumption-ui/interpolate-new';
import type { ThemeOrAny } from '@gumption-ui/interpolate-new/theme';
import { useTheme } from '@gumption-ui/integral';
import { jsx } from './jsx';
import { CssProp, GumptionUIStyleObject } from './types';

type Components = Tokens<'components'>;

type ThemingOptions<ThemeKey extends string = string> = {
  variant?: ThemeKey extends Components
    ? keyof ThemeOrAny['components'][ThemeKey]['variants'] | (string & {})
    : string;
  size?: ThemeKey extends Components
    ? keyof ThemeOrAny['components'][ThemeKey]['sizes'] | (string & {})
    : string;
  baseStyle?: GumptionUIStyleObject;
  themeKey?: ThemeKey | (string & {});
  styleConfig?: Dict;
};

type OtionHTMLProps = KwarkHTMLProps & CssProp;

export const useStyleConfig = createHook<ThemingOptions, OtionHTMLProps>({
  keys: ['variant', 'size', 'themeKey', 'baseStyle'],
  useProps: (
    { themeKey, styleConfig: styleConfigProp, ...options },
    htmlProps,
  ) => {
    const theme = useTheme();
    // const optionsWithTheme = { ...options, theme };

    const themeStyleConfig = get(theme, `components.${themeKey}`);
    const styleConfig = styleConfigProp || themeStyleConfig;

    /**
     * Store the computed styles in a `ref` to avoid unneeded re-computation
     */
    const stylesRef = useRef<GumptionUIStyleObject>({});

    const { variant, size } = options;

    useMemo(() => {
      if (styleConfig) {
        const baseStyles = styleConfig.baseStyle ?? {};
        const variantStyles = styleConfig.variants?.[variant || ''] ?? {};
        const sizeStyles = styleConfig.sizes?.[size || ''] ?? {};

        const styles = merge.all([{}, baseStyles, variantStyles, sizeStyles]);

        const isStyleEqual = isEqual(stylesRef.current, styles);

        if (!isStyleEqual) {
          stylesRef.current = styles;
        }
      }
    }, [styleConfig, variant, size]);

    return {
      css: stylesRef.current,
      ...htmlProps,
    };
  },
});

type StyledConfig<T, ThemeKey extends string> = Exclude<
  KwarkConfig<T, ThemingOptions<ThemeKey>>,
  'useCreateElement'
> &
  ThemingOptions<ThemeKey>;

function styled<T extends As, ThemeKey extends string>(
  component: T,
  {
    baseStyle,
    themeKey,
    variant,
    size,
    ...config
  }: StyledConfig<T, ThemeKey> = {},
): Component<
  T,
  Omit<ThemingOptions<ThemeKey>, 'baseStyle' | 'themeKey'> & CssProp
> {
  const compose = [useStyleConfig];

  if (config.useHook) {
    // @ts-ignore -- TODO comment
    compose.push(config.useHook);
  }

  const useHook = createHook<ThemingOptions<ThemeKey>, OtionHTMLProps>({
    useOptions: () => ({
      baseStyle,
      themeKey,
      variant,
      size,
    }),
    compose,
  });

  return rawKwark(component, {
    useCreateElement: jsx,
    useHook,
    ...config,
  });
}

type KwarkJSXElements = {
  [Tag in DOMElements]: Component<Tag, ThemingOptions<Tag>>;
};

const kwark = (styled as unknown) as typeof styled & KwarkJSXElements;

domElements.forEach((tag) => {
  kwark[tag] = kwark(tag, { themeKey: tag });
});

export { createHook, kwark };
export type { OtionHTMLProps };
