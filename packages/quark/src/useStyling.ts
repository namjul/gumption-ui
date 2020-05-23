import { css } from 'otion';
import { LiteralUnion, ValueOf } from 'type-fest';
import { ThemeOrAny } from '@gumption-ui/quark/theme';
import { Tokens } from './types';
import { useTheme } from './ThemeContext';

/**
 * The following types are taken from: https://github.com/kripod/glaze/blob/4a9664f4ad54f23af96774e56b609a8c724bf1a7/packages/glaze/src/useStyling.ts#L13-L38
 */

type ResolveShorthand<T extends Tokens<'shorthands'>> = ValueOf<
  ThemeOrAny['shorthands'][T],
  number
>;

type ResolveAlias<
  T extends Tokens<'aliases'>
> = ThemeOrAny['aliases'][T] extends Tokens<'shorthands'>
  ? ResolveShorthand<ThemeOrAny['aliases'][T]>
  : ThemeOrAny['aliases'][T];

type ScaleKeys<Property> = LiteralUnion<
  Extract<
    keyof ThemeOrAny['scales'][ThemeOrAny['matchers'][Extract<
      Property,
      Tokens<'matchers'>
    >]],
    ValueOf<React.CSSProperties>
  >,
  ValueOf<React.CSSProperties>
>;

export type ThemedStyle = React.CSSProperties &
  { [key in Tokens<'matchers'>]?: ScaleKeys<key> } &
  { [key in Tokens<'shorthands'>]?: ScaleKeys<ResolveShorthand<key>> } &
  { [key in Tokens<'aliases'>]?: ScaleKeys<ResolveAlias<key>> };

export function useStyling(): (themedStyle: ThemedStyle) => string {
  const theme = useTheme();
  return function sx(themedStyle: ThemedStyle): string {
    const result: ThemedStyle = {};
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const alias in themedStyle) {
      const value = themedStyle[alias as keyof ThemedStyle];

      if (value != null) {
        const {
          aliases = {},
          shorthands = {},
          matchers = {},
          scales = {},
        } = theme;
        const shorthand = aliases[alias] ?? alias;

        (shorthands[shorthand] ?? [shorthand]).forEach(
          // eslint-disable-next-line no-loop-func
          (property: keyof React.CSSProperties) => {
            // TODO: Support selectors and media queries
            const scaleName = matchers[property];
            const scale = scaleName ? scales[scaleName] : {};
            const actualValue = (scale as any)[value] ?? value;
            result[property] = actualValue;
          },
        );
      }
    }

    return css(result);
  };
}
