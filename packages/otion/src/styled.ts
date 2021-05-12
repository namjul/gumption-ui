import {
  kwark,
  Component,
  // createHook,
  // KwarkHTMLProps,
  KwarkOptions,
  KwarkConfig,
} from '@gumption-ui/kwark';
import { As } from '@gumption-ui/utils';
import { jsx } from './jsx';

type StyledOptions = KwarkOptions;

type StyledConfig<T, O> = Exclude<KwarkConfig<T, O>, 'useCreateElement'>;

// type Config = {
//   themeKey?: string;
//   variant?: string;
//   size?: string;
// };

// const useStyleConfig = createHook<Config, KwarkHTMLProps>({
//   keys: ['variant', 'size', 'themeKey'],
//   // useProps: (options, { css, ...htmlProps }) => {
//   //   const theme = useTheme();
//   //   const optionsWithTheme = { ...options, theme };
//   //   const computedStyles: ThemedStyle = {
//   //     ...baseStyles(optionsWithTheme),
//   //     ...modifierStyle(optionsWithTheme),
//   //     ...useSlotStyles(name),
//   //     ...css,
//   //   };
//   //
//   //   return {
//   //     ...htmlProps,
//   //     css: computedStyles,
//   //   };
//   // },
// });

export function styled<T extends As, O extends StyledOptions>(
  component: T,
  config: StyledConfig<T, O> = {},
): Component<T, O> {
  return kwark(component, {
    useCreateElement: jsx,
    ...config,
  });
}
