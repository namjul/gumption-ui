import * as CSS from 'csstype';
import type { ThemeOrAny } from '@gumption-ui/interpolate-new/theme';
import { LiteralUnion, ValueOf, Empty } from '@gumption-ui/utils';

type Modify<T, R> = Omit<T, keyof R> & R;

export type Theme = Partial<ThemeOrAny>;

export type Tokens<T extends keyof ThemeOrAny> = Extract<
  keyof ThemeOrAny[T],
  string | number
>;
export type Matchers = Tokens<'matchers'>;
export type Shorthands = Tokens<'shorthands'>;
export type Aliases = Tokens<'aliases'>;
export type Variants = LiteralUnion<Tokens<'variants'>, string>;

type ResolveShorthand<T extends Shorthands> = ValueOf<
  ThemeOrAny['shorthands'][T],
  number
>;

type ResolveAlias<
  T extends Aliases
> = ThemeOrAny['aliases'][T] extends Shorthands
  ? ResolveShorthand<ThemeOrAny['aliases'][T]>
  : ThemeOrAny['aliases'][T];

type ScaleKeys<Property> = LiteralUnion<
  Extract<
    keyof ThemeOrAny['scales'][ThemeOrAny['matchers'][Extract<
      Property,
      Matchers
    >]],
    ValueOf<CSSProperties>
  >,
  ValueOf<CSSProperties>
>;

export type StylePropertyValue<T> = T | Empty | ((theme: Theme) => T | Empty);

// --- CSSProperties

export type CSSProperties = CSS.StandardProperties<number | string> &
  CSS.SvgProperties<number | string> &
  CSS.VendorProperties<number | string>;

// --- CSSObject

type CSSOthersObjectForCSSObject = {
  [name: string]: undefined | number | string | CSSObject;
};

/**
 * CSS as POJO that is compatible with CSS-in-JS libaries.
 * Used as the return type of `interpolate` function
 */
export type CSSObject = CSSProperties & CSSOthersObjectForCSSObject;

/**
 * Example:

const cssObject: CSSObject = {
  // boxSizing: 'sdf',
  boxSizing: 'border-box',
  display: 'flex',
  'pseudo|selector|mq|support': {
    color: 'primary',
    boxSizing: 'border-box',
  },
  selectors: {
    // Always start with "&", representing the parent rule
    // See: https://drafts.csswg.org/css-nesting/#nest-selector
    '& > * + *': {
      marginLeft: 16,
    },

    // In a comma-separated list, each individual selector shall start with "&"
    '&:focus, &:active': {
      outline: 'solid',
    },

    // Self-references are also supported
    '& + &': {
      color: 'green',
    },
  },
  '@media': {
    '(min-width: 600px)': {
      color: 'rebeccapurple',
      ':hover': {
        background: 'papayawhip',
      },
    },
    '(min-width: 1000px)': {
      color: 'teal',
    },
  },
};
*/

// --- GumptionUICSSProperties

export type ThemedCSSObject = { [key in Matchers]?: ScaleKeys<key> } &
  { [key in Shorthands]?: ScaleKeys<ResolveShorthand<key>> } &
  { [key in Aliases]?: ScaleKeys<ResolveAlias<key>> };

export type GumptionUIExtendedCSSProperties = Modify<
  CSSProperties,
  ThemedCSSObject
>;

export type GumptionUICSSProperties = {
  [key in keyof GumptionUIExtendedCSSProperties]: StylePropertyValue<
    GumptionUIExtendedCSSProperties[key]
  >;
};

/**
 * Example:

const gumptionUICSSProperties: GumptionUICSSProperties = {
  color: 'primary',
  bottom: 'small',
  direction: 'ltr',
  boxSizing: 'border-box',
};

*/

// --- GumptionUICSSObject

export type VariantProperty = {
  variant?: Variants;
};

type CSSOthersObject = {
  [name: string]: StylePropertyValue<string | number | GumptionUIStyleObject>;
};

export type GumptionUICSSObject = GumptionUICSSProperties &
  VariantProperty &
  CSSOthersObject;

/**
 * Example:

const gumptionUICSSObject: GumptionUICSSObject = {
  bottom: 'small',
  direction: 'ltr',
  variant: 'text',
  ':after': () => ({
    width: 100,
    color: 'secondary',
  }),
  ':hover': {
    boxSizing: () => 'border-box',
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
    },
  },
};

*/

// --- GumptionUIStyleObject

type ThemeDerivedStyles = (theme: Theme) => GumptionUICSSObject;

export type GumptionUIStyleObject = GumptionUICSSObject | ThemeDerivedStyles;
