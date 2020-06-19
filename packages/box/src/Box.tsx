import {
  quark,
  QuarkOptions,
  QuarkHTMLProps,
  TestThemedStyle,
} from '@gumption-ui/quark';

export type BoxOptions = QuarkOptions & {
  margin?: TestThemedStyle['margin'];
};
export type BoxHTMLProps = QuarkHTMLProps;
export type BoxProps = BoxOptions & BoxHTMLProps;

export const Box = quark<'div', BoxOptions, BoxHTMLProps>('div', {
  keys: ['margin'],
  useHook: {
    useOptions: (options) => ({
      css: {
        margin: options.margin,
      },
      ...options,
    }),
  },
});
