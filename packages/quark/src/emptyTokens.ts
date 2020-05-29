export const emptyTokens = {
  scales: {
    space: {
      0: 4,
      1: 8,
      2: 16,
      3: 24,
      4: 32,
      5: 40,
      6: 48,
    },
  },
  shorthands: {
    klar: ['top', 'right', 'bottom', 'left'],
  },
  aliases: {
    p: 'padding',
    i: 'klar',
  },
  matchers: {
    padding: 'space',
  },
} as const;

// export const defaultTokens = {
//   scales: {
//     breakpoints: [640, 768, 1024, 1280],
//     space: {
//       small: 10,
//       middle: 100,
//       large: 1000,
//     },
//   },
//   shorthands: {
//     // TODO: Remove if widely supported by browsers
//     inset: ['top', 'right', 'bottom', 'left'],
//     insetX: ['left', 'right'],
//     insetY: ['top', 'bottom'],

//     // TODO: Remove if widely supported by browsers
//     size: ['width', 'height'],

//     paddingX: ['paddingLeft', 'paddingRight'],
//     paddingY: ['paddingTop', 'paddingBottom'],

//     marginX: ['marginLeft', 'marginRight'],
//     marginY: ['marginTop', 'marginBottom'],
//   },
//   aliases: {
//     p: 'padding',
//     px: 'paddingX',
//     py: 'paddingY',
//     pt: 'paddingTop',
//     pr: 'paddingRight',
//     pb: 'paddingBottom',
//     pl: 'paddingLeft',
//     // TODO: For logical properties, e.g. lpi, lpis, lpie, lpb, lpbs, lpbe

//     m: 'margin',
//     mx: 'marginX',
//     my: 'marginY',
//     mt: 'marginTop',
//     mr: 'marginRight',
//     mb: 'marginBottom',
//     ml: 'marginLeft',
//     // TODO: For logical properties, e.g. lmi, lmis, lmie, lmb, lmbs, lmbe

//     bg: 'background',
//   },
//   matchers: {
//     margin: 'space',
//     marginTop: 'space',
//     marginRight: 'space',
//     marginBottom: 'space',
//     marginLeft: 'space',
//     padding: 'space',
//     paddingTop: 'space',
//     paddingRight: 'space',
//     paddingBottom: 'space',
//     paddingLeft: 'space',
//     gridGap: 'space',
//     gridColumnGap: 'space',
//     gridRowGap: 'space',
//     // fontSize: 'fontSizes',
//     // color: 'colors',
//     // backgroundColor: 'colors',
//     // borderColor: 'colors',
//     // fontFamily: 'fonts',
//     // fontWeight: 'fontWeights',
//     // lineHeight: 'lineHeights',
//     // width: 'sizes',
//     // height: 'sizes',
//     // minWidth: 'sizes',
//     // maxWidth: 'sizes',
//     // minHeight: 'sizes',
//     // maxHeight: 'sizes',
//     // border: 'borders',
//     // borderTop: 'borders',
//     // borderRight: 'borders',
//     // borderBottom: 'borders',
//     // borderLeft: 'borders',
//     // borderWidth: 'borderWidths',
//     // borderStyle: 'borderStyles',
//     // borderRadius: 'radii',
//     // boxShadow: 'shadows',
//     // textShadow: 'shadows',
//     // zIndex: ' zIndices',
//     // transition: 'transitions',
//   },
// } as const;
