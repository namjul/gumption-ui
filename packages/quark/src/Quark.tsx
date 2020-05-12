import * as React from 'react';
import { createComponent, createHook } from 'reakit-system';
import { cx } from '@emotion/css';
import { useStyling } from './useStyling';

export type QuarkOptions = {
  css?: {};
  _css?: {};
};

export type QuarkHTMLProps = React.HTMLAttributes<any> &
  React.RefAttributes<any>;

export const useQuark = createHook<QuarkOptions, QuarkHTMLProps>({
  useProps({ css, _css }, { className, ...htmlProps }) {
    const toClassName = useStyling();
    const computedStyles = { ...(css || {}), ...(_css || {}) };
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
