import {
  GumptionUIExtendedCSSProperties,
  VariantProperty,
  StylePropertyValue,
  Theme,
} from '@gumption-ui/interpolate-new';
import { ResponsiveStyleValue } from '@gumption-ui/utils';
import * as CSS from 'csstype';

export type CSSStyleRules<P extends Record<string, any>> = P &
  {
    [pseudo in CSS.SimplePseudos]?: StylePropertyValue<ResponsiveStyleValue<P>>;
  } & {
    selectors?: StylePropertyValue<{ [selector: string]: P }>;
  };

export interface CSSGroupingRules<P extends Record<string, any>> {
  '@media'?: {
    [conditionText: string]: CSSRules<P>;
  };
  '@supports'?: {
    [conditionText: string]: CSSRules<P>;
  };
}

export type CSSRules<P extends Record<string, any>> = CSSStyleRules<P> &
  CSSGroupingRules<P>;

export type GumptionUICSSProperties = {
  [key in keyof GumptionUIExtendedCSSProperties]: StylePropertyValue<
    ResponsiveStyleValue<GumptionUIExtendedCSSProperties[key]>
  >;
};

export type GumptionUICSSObject = CSSRules<GumptionUICSSProperties> &
  VariantProperty;

type ThemeDerivedStyles = (theme: Theme) => GumptionUICSSObject;

export type GumptionUIStyleObject = GumptionUICSSObject | ThemeDerivedStyles;

/**
 * Example:
 */
export const themedCSSObjecta: GumptionUIStyleObject = {
  bottom: 'small',
  direction: 'ltr',
  variant: 'text',

  color: (t) => [t.scales?.colors.primary, t.scales?.colors.secondary],

  boxSizing: () => ['border-box'],
  ':hover': [{ width: 'small' }, { width: 'medium' }],
  display: ['flex'],
  ':after': () => ({
    width: 100,
    background: ['red', 'green'],
    color: () => ['red', 'green', 'blue'],
    display: ['flex'],
    boxSizing: () => 'border-box',
  }),

  selectors: () => ({
    property: {
      background: ['red', 'green'],
      boxSizing: () => ['border-box'],
    },
    selector1: {
      color: 'tomato',
    },
    selector2: {
      '@media': {
        '(min-width: 640px)': {
          backgroundColor: 'cyan',
        },
      },
      backgroundColor: 'tomato',
    },
  }),

  // property1: undefined,
  // property2: null,
  // property3: false,
  // property4: 'value',
  // property5: {},
  // property6: () => undefined,
  // property7: () => null,
  // property8: () => false,
  // property9: () => 'value',
  // property10: () => ({}),
  // property11: () => ['border-box', 'value', {}],
  // property12: ['border-box', 'value', {}],
  property13: {
    property1: undefined,
    property2: null,
    property3: false,
    property4: 'value',
    property5: {},
    property6: () => undefined,
    property7: () => null,
    property8: () => false,
    property9: () => 'value',
    property10: () => ({}),
    property11: () => ['border-box', 'value', {}],
    property12: ['border-box', 'value', {}],
    property13: {
      color: 'primary',
      bottom: 'small',
      direction: 'ltr',
      variant: 'text',
      boxSizing: () => 'border-box',
      ':hover': {
        color: 'secondary',
      },
      property1: undefined,
      property2: null,
      property3: false,
      property4: 'value',
      property5: {},
      property6: () => undefined,
      property7: () => null,
      property8: () => false,
      property9: () => 'value',
      property10: () => ({}),
      property11: () => ['border-box', 'value', {}],
      property12: ['border-box', 'value', {}],
    },
  },
};

export interface CssProp extends VariantProperty {
  css?: GumptionUIStyleObject;
}
