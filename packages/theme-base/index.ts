const grid = 8;

const numberToPx = (value: number) => `${value}px`;

const space = {
  'xx-small': 4,
  'x-small': 8,
  small: 16,
  medium: 24,
  large: 32,
  'x-large': 40,
  'xx-large': 48,
};

export const theme = {
  breakpoints: [640, 768, 1024, 1280],
  scales: {
    space,
    sizes: {
      ...space,
      auto: 'auto',
      '100%': '100%',
    },
    colors: {
      primary: 'tomato',
      secondary: 'cyan',
      gray: [
        '#F8F9F9',
        '#EDEFF1',
        '#DDE0E4',
        '#CBD1D6',
        '#B2BAC2',
        '#939BA3', // base
        '#7A838C',
        '#636d75',
        '#515961',
        '#343b40',
      ],
      text: {
        subtle: 'gray.0',
        body: 'gray.1',
      },
    },
    fontSizes: {
      'xxx-small': 10,
      'xx-small': 12,
      'x-small': 16,
      small: 20,
      medium: 24,
      large: 32,
      'x-large': 40,
      'xx-large': 48,
      'xxx-large': 64,
    },
    fonts: {
      body: 'Inter, sans-serif',
      heading: 'Inherit',
      monospace:
        "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
    lineHeights: {
      'xxx-small': numberToPx(grid * 2),
      'xx-small': numberToPx(grid * 2),
      'x-small': numberToPx(grid * 3),
      small: numberToPx(grid * 4),
      medium: numberToPx(grid * 4),
      large: numberToPx(grid * 6),
      'x-large': numberToPx(grid * 7),
      'xx-large': numberToPx(grid * 8),
      'xxx-large': numberToPx(grid * 10),
    },
    fontWeights: {
      regular: 400,
      semiBold: 600,
      bold: 700,
    },
    // letterSpacings: {},
    // borders: {},
    // borderStyles: {},
    borderWidths: { 1: 1, 2: 2, 4: 4, 8: 8 },
    radii: {
      small: '.125rem',
      medium: '.25rem',
      large: '.5rem',
      full: 9999,
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)',
      md: '0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06)',
      lg: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)',
      xl: '0 20px 25px -5px rgba(0,0,0,.1),0 10px 10px -5px rgba(0,0,0,.04)',
      inner: 'inset 0 2px 4px 0 rgba(0,0,0,.06)',
      outline: '0 0 0 3px rgba(66,153,225,.5)',
    },
    // opacities: {},
    // zIndices: {},
  },
  shorthands: {
    // TODO: Remove if widely supported by browsers
    inset: ['top', 'right', 'bottom', 'left'],
    insetX: ['left', 'right'],
    insetY: ['top', 'bottom'],

    // TODO: Remove if widely supported by browsers
    size: ['width', 'height'],

    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],

    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
  },
  aliases: {
    p: 'padding',
    px: 'paddingX',
    py: 'paddingY',
    pt: 'paddingTop',
    pr: 'paddingRight',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    // TODO: For logical properties, e.g. lpi, lpis, lpie, lpb, lpbs, lpbe

    m: 'margin',
    mx: 'marginX',
    my: 'marginY',
    mt: 'marginTop',
    mr: 'marginRight',
    mb: 'marginBottom',
    ml: 'marginLeft',
    // TODO: For logical properties, e.g. lmi, lmis, lmie, lmb, lmbs, lmbe

    bg: 'backgroundColor',
  },
  matchers: {
    top: 'space',
    right: 'space',
    bottom: 'space',
    left: 'space',
    margin: 'space',
    marginTop: 'space',
    marginRight: 'space',
    marginBottom: 'space',
    marginLeft: 'space',
    padding: 'space',
    paddingTop: 'space',
    paddingRight: 'space',
    paddingBottom: 'space',
    paddingLeft: 'space',
    gap: 'space',
    gridGap: 'space',
    gridColumnGap: 'space',
    gridRowGap: 'space',
    fontSize: 'fontSizes',
    color: 'colors',
    backgroundColor: 'colors',
    borderColor: 'colors',
    fontFamily: 'fonts',
    fontWeight: 'fontWeights',
    lineHeight: 'lineHeights',
    width: 'sizes',
    height: 'sizes',
    minWidth: 'sizes',
    maxWidth: 'sizes',
    minHeight: 'sizes',
    maxHeight: 'sizes',
    flexBasis: 'sizes',
    // border: 'borders',
    // borderTop: 'borders',
    // borderRight: 'borders',
    // borderBottom: 'borders',
    // borderLeft: 'borders',
    borderWidth: 'borderWidths',
    // borderStyle: 'borderStyles',
    borderRadius: 'radii',
    boxShadow: 'shadows',
    textShadow: 'shadows',
    // letterSpacing: 'letterSpacings',
    // opacity: 'opacities',
    // zIndex: ' zIndices',
  },

  variants: {
    buttons: {
      primarytw: 'h-screen bg-purple-400 flex items-center justify-center',
      primary: {
        color: 'white',
        bg: 'primary',
      },
      secondary: {
        color: 'white',
        bg: 'secondary',
      },
    },
  },

  components: {
    root: {},
    a: {},
    p: {},
    pre: {},
    code: {},
    heading: {},
    button: {},
    input: {},
    select: {},
  },
} as const;
