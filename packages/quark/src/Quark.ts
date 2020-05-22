import * as React from 'react';
import { createComponent, createHook } from 'reakit-system';
import { cx } from '@emotion/css';
import { LiteralUnion, ValueOf } from 'type-fest';
import { useStyling } from './useStyling';
import { Tokens, ThemeOrAny } from './theme';

/**
 * Source: https://github.com/kripod/glaze/blob/4a9664f4ad54f23af96774e56b609a8c724bf1a7/packages/glaze/src/useStyling.ts#L13-L38
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

type ThemedStyle = React.CSSProperties &
  { [key in Tokens<'matchers'>]?: ScaleKeys<key> } &
  { [key in Tokens<'shorthands'>]?: ScaleKeys<ResolveShorthand<key>> } &
  { [key in Tokens<'aliases'>]?: ScaleKeys<ResolveAlias<key>> };

export type QuarkOptions = {
  css?: ThemedStyle;
  _css?: ThemedStyle;
};

export type QuarkHTMLProps = React.HTMLAttributes<any> &
  React.RefAttributes<any>;

export const useQuark = createHook<QuarkOptions, QuarkHTMLProps>({
  useProps({ css, _css }, { className, ...htmlProps }) {
    const toClassName = useStyling();
    const computedStyles = { ...(css || {}), ...(_css || {}) }; // TODO proper merge of `css` and `_css`
    return {
      className: cx(className, toClassName(computedStyles)),
      ...htmlProps,
    };
  },
  keys: ['css', '_css'],
});

export const Quark = createComponent({
  as: 'div',
  useHook: useQuark,
});
