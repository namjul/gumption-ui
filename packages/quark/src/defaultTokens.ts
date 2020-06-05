const space = {
  0: 4,
  1: 8,
  2: 16,
  3: 24,
  4: 32,
  5: 49,
  6: 48,
};

export const defaultTokens = {
  scales: {
    // breakpoints: [640, 768, 1024, 1280],
    space,
    size: {
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
    },
    // fontSizes: [12, 14, 16, 24, 36],
    // fonts: {
    //   monospace: 'Menlo, monospace',
    // },
    // lineHeights: {
    //   body: 1.5,
    // },
    // fontWeights: {
    //   bold: 600,
    // },
    // sizes: {
    //   small: 4,
    //   medium: 8,
    //   large: 16,
    //   sidebar: 320,
    // },
    // buttons: {
    //   primary: {
    //     p: 3,
    //     fontWeight: 'bold',
    //     color: 'white',
    //     bg: 'primary',
    //     borderRadius: 2,
    //   },
    // },
    // text: {
    //   caps: {
    //     fontSize: [1, 2],
    //     letterSpacing: '0.1em',
    //     textTransform: 'uppercase',
    //   },
    //   title: {
    //     fontSize: [3, 4],
    //     letterSpacing: ['-0.01em', '-0.02em'],
    //   },
    // },
    // borderWidths: {
    //   thin: 1,
    // },
    // borderStyles: {
    //   thick: 'solid',
    // },
    // radii: {
    //   small: 5,
    // },
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

    bg: 'background',
  },
  matchers: {
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
    gridGap: 'space',
    gridColumnGap: 'space',
    gridRowGap: 'space',
    // fontSize: 'fontSizes',
    color: 'colors',
    backgroundColor: 'colors',
    borderColor: 'colors',
    // fontFamily: 'fonts',
    // fontWeight: 'fontWeights',
    // lineHeight: 'lineHeights',
    // width: 'sizes',
    // height: 'sizes',
    // minWidth: 'sizes',
    // maxWidth: 'sizes',
    // minHeight: 'sizes',
    // maxHeight: 'sizes',
    // border: 'borders',
    // borderTop: 'borders',
    // borderRight: 'borders',
    // borderBottom: 'borders',
    // borderLeft: 'borders',
    // borderWidth: 'borderWidths',
    // borderStyle: 'borderStyles',
    // borderRadius: 'radii',
    // boxShadow: 'shadows',
    // textShadow: 'shadows',
    // zIndex: ' zIndices',
    // transition: 'transitions',
  },
} as const;
