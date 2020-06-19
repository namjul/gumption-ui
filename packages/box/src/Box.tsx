import {
  quark,
  QuarkOptions,
  QuarkHTMLProps,
  ThemedStyle,
} from '@gumption-ui/quark';

const background = {
  background: true,
  backgroundColor: true,
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundBlendMode: true,
};

const border = {
  border: true,
  borderWidth: true,
  borderStyle: true,
  borderColor: true,
  borderRadius: true,
  borderTop: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderRight: true,
  borderBottom: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  borderLeft: true,
  borderTopWidth: true,
  borderTopColor: true,
  borderTopStyle: true,
  borderBottomWidth: true,
  borderBottomColor: true,
  borderBottomStyle: true,
  borderLeftWidth: true,
  borderLeftColor: true,
  borderLeftStyle: true,
  borderRightWidth: true,
  borderRightColor: true,
  borderRightStyle: true,
};

const color = {
  color: true,
  opacity: true,
  fill: true,
  stroke: true,
};

const flexbox = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  justifySelf: true,
  alignSelf: true,
  order: true,
};

const grid = {
  gridGap: true,
  gridColumnGap: true,
  gridRowGap: true,
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
  placeItems: true,
};

const layout = {
  width: true,
  height: true,
  minWidth: true,
  minHeight: true,
  maxWidth: true,
  maxHeight: true,
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  boxSizing: true,
};

const others = {
  animation: true,
  appearance: true,
  transform: true,
  transformOrigin: true,
  visibility: true,
  userSelect: true,
  pointerEvents: true,
  cursor: true,
  resize: true,
  transition: true,
  transitionProperty: true,
  transitionDuration: true,
  transitionTimingFunction: true,
  objectFit: true,
  objectPosition: true,
  float: true,
  willChange: true,
  listStyleType: true,
  listStylePosition: true,
  listStyleImage: true,
};

const outline = {
  outline: true,
  outlineOffset: true,
  outlineColor: true,
};

const position = {
  position: true,
  zIndex: true,
  inset: true,
  insetX: true,
  insetY: true,
  top: true,
  right: true,
  bottom: true,
  left: true,
};

const shadow = {
  boxShadow: true,
  textShadow: true,
};

const space = {
  margin: true,
  marginTop: true,
  marginRight: true,
  marginBottom: true,
  marginLeft: true,
  padding: true,
  paddingTop: true,
  paddingRight: true,
  paddingBottom: true,
  paddingLeft: true,
};

const typography = {
  fontFamily: true,
  fontSize: true,
  fontWeight: true,
  lineHeight: true,
  letterSpacing: true,
  textAlign: true,
  fontStyle: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  textDecoration: true,
};

const boxProps = {
  ...background,
  ...border,
  ...color,
  ...flexbox,
  ...grid,
  ...layout,
  ...others,
  ...position,
  ...shadow,
  ...space,
  ...typography,
  ...outline,
};

export type BoxOptions = QuarkOptions &
  Pick<ThemedStyle, keyof typeof boxProps>;
export type BoxHTMLProps = QuarkHTMLProps;
export type BoxProps = BoxOptions & BoxHTMLProps;

export const Box = quark<'div', BoxOptions, BoxHTMLProps>('div', {
  keys: Object.keys(boxProps),
  useHook: {
    useOptions: ({ css, _css, variant, size, ...options }) => ({
      _css: {
        ..._css,
        ...options,
      },
      css,
      variant,
      size,
      ...options,
    }),
  },
});
