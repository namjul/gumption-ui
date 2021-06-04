import { theme as baseTheme } from '@gumption-ui/theme-base'; // eslint-disable-line import/no-extraneous-dependencies

const scales = {
  space: {
    0: 0,
    1: '1rem',
  },
  colors: {
    'nc-tx-1': '#000000',
    'nc-tx-2': '#1A1A1A',
    'nc-bg-1': '#FFFFFF',
    'nc-bg-2': '#F6F8FA',
    'nc-bg-3': '#E5E7EB',
    'nc-lk-1': '#0070F3',
    'nc-lk-2': '#0366D6',
    'nc-lk-tx': '#FFFFFF',
    'nc-ac-1': '#79FFE1',
    'nc-ac-tx': '#0C4047',
  },
  fonts: {
    sans:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono:
      'Consolas, monaco, "Ubuntu Mono", "Liberation Mono", "Courier New", Courier, monospace',
  },
};

const disabledButtonStyles = {
  opacity: 0.5,

  /* Set the [X] cursor while hovering a disabled link */
  cursor: ' not-allowed',
};

const buttonFocusHoverStyles = {
  backgroundColor: 'nc-lk-2',
};

const buttonStyles = {
  fontSize: '1rem',
  display: ' inline-block',
  padding: '6px 12px',
  textAlign: 'center',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  backgroundColor: 'nc-lk-1',
  color: 'nc-lk-tx',
  border: 0,
  borderRadius: '4px',
  boxSizing: ' border-box',
  cursor: 'pointer',
  ':focus': buttonFocusHoverStyles,
  ':enabled:hover': buttonFocusHoverStyles,
};

const codeStyles = {
  /* Set the font family for monospaced elements */
  fontFamily: 'mono',
  /* The main preformatted style. This is changed slightly across different cases. */
  backgroundColor: 'nc-bg-2',
  borderWith: 1,
  borderStyle: 'solid',
  borderColor: 'nc-bg-3',
  borderRadius: '4px',
  padding: '3px 6px',
  fontSize: '0.9rem',
};

const tableCellStyles = {
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: 'nc-bg-3',
  textAlign: 'left',
  padding: '.5rem',
};

const inputStyles = {
  padding: '6px 12px',
  marginBottom: '.5rem',
  backgroundColor: 'nc-bg-2',
  color: 'nc-tx-2',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'nc-bg-3',
  borderRadius: '4px',
  boxShadow: 'none',
  boxSizing: ' border-box',
};

const variants = {
  button: {
    secondary: {
      fontWeight: 'bold',
      color: 'white',
      bg: 'primary',
      '&:hover': {
        bg: 'dark',
      },
    },
  },
  text: {
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '.2em',
    },
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
    display: {
      // extends the text.heading styles
      variant: 'text.heading',
      fontSize: [6, 7, 8],
      fontWeight: 'display',
    },
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: '0 0 4px 1px rgba(0, 0, 0, 0.5)',
    },
  },
};

const components = {
  Root: {
    baseStyle: {
      fontFamily: 'sans',
      margin: '0 auto',
      maxWidth: '750px',
      padding: '2rem',
      borderRadius: '6px',
      overflowX: 'hidden',
      wordBreak: 'break-word',
      overflowWrap: 'break-word',
      backgroundColor: 'nc-bg-1',

      /* Main body text */
      color: 'nc-tx-2',
      fontSize: '1.03rem',
      lineHeight: 1.5,

      selectors: {
        '& *::selection': {
          /* Set background color for selected text */
          backgroundColor: 'nc-ac-1',
          color: 'nc-ac-tx',
        },
      },
    },
  },
  a: {
    baseStyle: {
      color: 'nc-lk-1',
      '&:hover': {
        /* Set the '?' cursor while hovering an abbreviation */
        cursor: 'help',
      },
      selectors: {
        '& button': buttonStyles,
        '& button[disabled]': disabledButtonStyles,
      },
    },
  },
  abbr: {
    baseStyle: {
      cursor: '	cursor: help;',
    },
  },
  address: {
    baseStyle: {
      marginBottom: 1,
    },
  },
  area: {
    baseStyle: {
      marginBottom: 1,
    },
  },
  article: {
    baseStyle: { marginBottom: 1 },
  },
  aside: {
    baseStyle: { marginBottom: 1 },
  },
  audio: {
    baseStyle: { marginBottom: 1 },
  },
  blockquote: {
    baseStyle: {
      marginBottom: 1,
      padding: '1.5rem',
      backgroundColor: 'nc-bg-2',
      borderStyle: 'solid',
      borderWidth: 0,
      borderLeftWidth: '5px',
      borderColor: 'nc-bg-3',
      selectors: {
        '& *:last-child': {
          paddingBottom: 0,
          marginBottom: 0,
        },
      },
    },
  },
  button: {
    baseStyle: {
      fontFamily: 'sans',
      ...buttonStyles,
      selectors: {
        '&[disabled]': disabledButtonStyles,
      },
    },
  },
  code: {
    baseStyle: {
      ...codeStyles,
      selectors: {
        '& pre': {
          /* When <pre> is in a <code>, reset it's formatting to blend in */
          display: 'inline',
          backgroundColor: 'inherit',
          fontSize: 'inherit',
          color: 'inherit',
          border: 0,
          padding: 0,
          margin: 0,
        },
      },
    },
  },
  datalist: {
    baseStyle: { marginBottom: 1 },
  },
  details: {
    baseStyle: {
      marginBottom: 1,

      /* Make the <details> look more "clickable" */
      padding: '.6rem 1rem',
      backgroundColor: 'nc-bg-2',
      borderWidth: 1,
      borderColor: 'nc-bg-3',
      borderStyle: 'solid',
      borderRadius: '4px',

      selectors: {
        '&[open]': {
          /* Adjust the <details> padding while open */
          paddingBottom: '.75rem',
        },
        '&[open] summary': {
          /* Adjust the <details> padding while open */
          marginBottom: '6px',
        },
        '&[open] > *:last-child': {
          /* Resets the bottom margin of the last element in the <details> while <details> is opened. This prevents double margins/paddings. */
          marginBottom: 0,
        },
      },
    },
  },
  dl: {
    baseStyle: { marginBottom: 1 },
  },
  dt: {
    baseStyle: { marginBottom: 1, fontWeight: 'bold' },
  },
  dd: {
    baseStyle: {
      selectors: {
        '&::before': {
          /* Add an arrow to data table definitions */
          content: '→ ',
        },
      },
    },
  },
  fieldset: {
    baseStyle: {
      marginBottom: 1,
      marginTop: '1rem',
      padding: '2rem',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'nc-bg-3',
      borderRadius: '4px',
    },
  },
  figure: {
    baseStyle: { marginBottom: 1 },
  },
  form: {
    baseStyle: { marginBottom: 1 },
  },
  h1: {
    baseStyle: {
      lineHeight: 1,
      color: 'nc-tx-1',
      paddingTop: '.875rem',
      paddingBottom: '2px',
      marginBottom: '8px',
      borderStyle: 'solid',
      borderWidth: 0,
      borderBottomWidth: '1px',
      borderColor: 'nc-bg-2',
      fontSize: '2.25rem',
    },
  },
  h2: {
    baseStyle: {
      lineHeight: 1,
      color: 'nc-tx-1',
      paddingTop: '.875rem',
      paddingBottom: '2px',
      marginBottom: '8px',
      borderStyle: 'solid',
      borderWidth: 0,
      borderBottomWidth: '1px',
      borderColor: 'nc-bg-2',
      fontSize: '1.85rem',
    },
  },
  h3: {
    baseStyle: {
      lineHeight: 1,
      color: 'nc-tx-1',
      paddingTop: '.875rem',
      paddingBottom: '2px',
      marginBottom: '8px',
      borderStyle: 'solid',
      borderWidth: 0,
      borderBottomWidth: '1px',
      borderColor: 'nc-bg-2',
      fontSize: '1.55rem',
    },
  },
  h4: {
    baseStyle: {
      lineHeight: 1,
      color: 'nc-tx-1',
      paddingTop: '.875rem',
      marginBottom: '.3rem',
      fontSize: '1.25rem',
    },
  },
  h5: {
    baseStyle: {
      lineHeight: 1,
      color: 'nc-tx-1',
      paddingTop: '.875rem',
      marginBottom: '.3rem',
      fontSize: '1rem',
    },
  },
  h6: {
    baseStyle: {
      lineHeight: 1,
      color: 'nc-tx-1',
      paddingTop: '.875rem',
      marginBottom: '.3rem',
      fontSize: '.875rem',
    },
  },
  header: {
    baseStyle: {
      backgroundColor: 'nc-bg-2',
      borderWidth: 1,
      borderBottomWidth: '1px',
      borderColor: 'nc-bg-3',
      padding: '2rem 1.5rem',

      /* This sets the right and left margins to cancel out the body's margins. It's width is still the same, but the background stretches across the page's width. */

      margin: '-2rem calc(0px - (50vw - 50%)) 2rem',

      /* Shorthand for:

        margin-top: -2rem;
        margin-bottom: 2rem;

        margin-left: calc(0px - (50vw - 50%));
        margin-right: calc(0px - (50vw - 50%)); */

      paddingLeft: 'calc(50vw - 50%)',
      paddingRight: 'calc(50vw - 50%)',

      selectors: {
        '& > *:first-child': {
          marginTop: 0,
          paddingTop: 0,
        },
        '& > *:last-child': {
          marginBottom: 0,
        },
      },
    },
    slots: {
      h1: {
        paddingBottom: 0,
        borderBottom: 0,
        color: 'red',
        ':first-child': {},
      },
      h2: {
        paddingBottom: 0,
        borderBottom: 0,
      },
      h3: {
        paddingBottom: 0,
        borderBottom: 0,
      },
    },
  },
  hr: {
    baseStyle: {
      /* Reset the border of the <hr> separator, then set a better line */
      border: 0,
      borderWidth: 0,
      borderBottomWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'nc-bg-3',
      margin: '1rem auto',
    },
  },
  input: {
    baseStyle: {
      ...inputStyles,
      marginBottom: 1,
      fontFamily: 'sans',
      selectors: {
        '& input[type="submit"], & input[type="reset"] & input[type="button"]': buttonStyles,
        '& input[type="submit"][disabled], & input[type="reset"][disabled] & input[type="button"][disabled]': buttonStyles,
        '& input[type="submit"]:focus, & input[type="submit"]:enabled:hover, & input[type="reset"]:focus, & input[type="reset"]:enabled:hover, & input[type="button"]:focus, & input[type="button"]:enabled:hover': buttonFocusHoverStyles,
      },
    },
  },
  iframe: {
    baseStyle: { marginBottom: 1 },
  },
  img: {
    baseStyle: { marginBottom: 1, maxWidth: '100%' },
  },
  kbd: {
    baseStyle: {
      ...codeStyles,
      /* Makes the kbd element look like a keyboard key */
      borderWidth: 0,
      borderBottomWidth: '3px',
      borderStyle: 'solid',
      borderColor: 'nc-bg-3',
    },
  },
  li: {
    baseStyle: {
      marginTop: '.4rem',
    },
  },
  legend: {
    baseStyle: {
      padding: 'auto .5rem',
    },
  },
  mark: {
    baseStyle: {
      marginBottom: 1,
      padding: '3px 6px',
      backgroundColor: 'nc-ac-1',
      color: 'nc-ac-tx',
    },
  },
  meter: {
    baseStyle: { marginBottom: 1 },
  },
  nav: {
    baseStyle: { marginBottom: 1 },
  },
  ol: {
    baseStyle: {
      marginBottom: 1,
      /* Replace the browser default padding */
      paddingLeft: '2rem',

      selectors: {
        '& ul, & ol': {
          marginBottom: 0,
        },
      },
    },
  },
  optgroup: {
    baseStyle: { marginBottom: 1 },
  },
  option: {
    baseStyle: { marginBottom: 1 },
  },
  output: {
    baseStyle: { marginBottom: 1 },
  },
  p: {
    baseStyle: { marginBottom: 1 },
  },
  pre: {
    baseStyle: {
      ...codeStyles,
      padding: '1rem 1.4rem',
      maxWidth: '100%',
      overflow: 'auto',
      marginBottom: 1,

      selectors: {
        '& code': {
          /* When <code> is in a <pre>, reset it's formatting to blend in */
          backgroundColor: 'inherit',
          fontSize: 'inherit',
          color: 'inherit',
          border: 0,
          padding: 0,
          margin: 0,
        },
      },
    },
  },
  progress: {
    baseStyle: { marginBottom: 1 },
  },
  ruby: {
    baseStyle: { marginBottom: 1 },
  },
  samp: {
    baseStyle: codeStyles,
  },
  section: {
    baseStyle: { marginBottom: 1 },
  },
  select: {
    baseStyle: {
      ...inputStyles,
      fontFamily: 'sans',
    },
  },
  summary: {
    baseStyle: {
      /* Makes the <summary> look more like a "clickable" link with the pointer cursor */
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  },
  table: {
    baseStyle: {
      marginBottom: 1,
      /* border-collapse sets the table's elements to share borders, rather than floating as separate "boxes". */
      borderCollapse: 'collapse',
      width: '100%',

      selectors: {
        '& caption': {
          fontWeight: 'bold',
          marginBottom: '.5rem',
        },
      },
    },
  },
  td: {
    baseStyle: tableCellStyles,
  },
  th: {
    baseStyle: {
      ...tableCellStyles,
      backgroundColor: 'nc-bg-2',
    },
  },
  tr: {
    baseStyle: {
      selectors: {
        '&:nth-child(event)': {
          /* Set every other cell slightly darker. Improves readability. */
          backgroundColor: 'nc-bg-2',
        },
      },
    },
  },
  textarea: {
    baseStyle: {
      ...inputStyles,
      marginBottom: 1,
      /* Don't let the <textarea> extend off the screen naturally or when dragged by the user */
      maxWidth: '100%',
    },
  },
  ul: {
    baseStyle: {
      marginBottom: 1,

      /* Replace the browser default padding */
      paddingLeft: '2rem',

      selectors: {
        '& ul, & ol': {
          marginBottom: 0,
        },
      },
    },
  },
  video: {
    baseStyle: { marginBottom: 1 },
  },
};

export const theme = {
  scales,
  shorthands: baseTheme.shorthands,
  aliases: baseTheme.aliases,
  matchers: baseTheme.matchers,
  variants,
  components,
} as const;

export type Theme = typeof theme;
