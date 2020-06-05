import * as React from 'react';
import { createComponent, createHook } from 'reakit-system';
import cc from 'classcat';
import deepmerge from 'deepmerge';
import { useStyling } from './useStyling';
import { ThemedStyle } from './types';

export type QuarkOptions = {
  css?: ThemedStyle;
  _css?: ThemedStyle;
};

export type QuarkHTMLProps = React.HTMLAttributes<any> &
  React.RefAttributes<any>;

export const useQuark = createHook<QuarkOptions, QuarkHTMLProps>({
  useProps({ css = {}, _css = {} }, { className, ...htmlProps }) {
    const toClassName = useStyling();
    return {
      className: cc([
        className,
        toClassName(deepmerge<ThemedStyle>(_css, css)),
      ]),
      ...htmlProps,
    };
  },
  keys: ['css', '_css'],
});

export const Quark = createComponent({
  as: 'div',
  useHook: useQuark,
});
