import { css } from 'otion';
import { LiteralUnion, ValueOf } from 'type-fest';
import { ThemeOrAny } from '@gumption-ui/quark/theme';
import { Tokens } from './types';

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
  return function sx(themedStyle: ThemedStyle): string {
    return css(themedStyle);
  };
}
