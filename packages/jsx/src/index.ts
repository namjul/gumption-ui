/* eslint-disable import/export */

import * as React from 'react';
import { As, PropsOf } from '@gumption-ui/utils';
import { interpolate, ThemedStyle, Theme } from '@gumption-ui/interpolate';
import cc from 'classcat';
import { css as toClassname } from 'otion';
import { GumptionJSX } from './jsx-namespace';

export type { GumptionJSX } from './jsx-namespace';

const { hasOwnProperty } = Object.prototype;

const ThemeContext = React.createContext<Theme | undefined>(undefined);

export interface ThemeProviderProps {
  theme: Theme;
  children: React.ReactNode;
}

export function useTheme(): Theme | undefined {
  return React.useContext(ThemeContext);
}

type GumptionProps<T extends As> = PropsOf<T> & {
  typePropName: T;
  css?: ThemedStyle;
};

const Gumption = <T extends As>(props: GumptionProps<T>) => {
  const theme = useTheme();

  const { css = {}, typePropName: type, children, ...htmlProps } = props;

  let computedProps = { ...htmlProps };

  // TODO allow css to be a function?
  computedProps = {
    ...computedProps,
    className: cc([
      computedProps.className,
      toClassname(interpolate(css)(theme)),
    ]),
  };

  return React.createElement(type, computedProps, children);
};

export function jsx<T extends As>(
  type: T,
  props: PropsOf<T>,
  ...children: React.ReactNode[]
): JSX.Element {
  // TODO strings in `css` are not allowed https://github.com/emotion-js/emotion/blob/master/packages/react/src/emotion-element.js#L25

  // eslint-disable-next-line prefer-rest-params -- in this case the parameters fit 100%
  const args: any = arguments;

  if (props == null || !hasOwnProperty.call(props, 'css')) {
    return React.createElement.apply(undefined, args);
  }

  return React.createElement(
    Gumption,
    {
      typePropName: type,
      ...props,
    },
    ...children,
  );
}
export function ThemeProvider({
  theme,
  children,
}: ThemeProviderProps): JSX.Element {
  return jsx(ThemeContext.Provider, { value: theme }, children);
}

// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the namspace the same as the exported function
export declare namespace jsx {
  export namespace JSX {
    export interface Element extends GumptionJSX.Element {}
    export interface ElementClass extends GumptionJSX.ElementClass {}
    export interface ElementAttributesProperty
      extends GumptionJSX.ElementAttributesProperty {}
    export interface ElementChildrenAttribute
      extends GumptionJSX.ElementChildrenAttribute {}
    export type LibraryManagedAttributes<
      C,
      P
    > = GumptionJSX.LibraryManagedAttributes<C, P>;
    export interface IntrinsicAttributes
      extends GumptionJSX.IntrinsicAttributes {}
    export interface IntrinsicClassAttributes<T>
      extends GumptionJSX.IntrinsicClassAttributes<T> {}
    export type IntrinsicElements = GumptionJSX.IntrinsicElements;
  }
}
