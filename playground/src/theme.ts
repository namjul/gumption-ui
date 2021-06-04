import { theme as baseTheme } from '@gumption-ui/theme-base';

const variants = {
  buttons: {
    secondary: {
      fontWeight: 'bold',
      color: 'white',
      bg: 'primary',
      '&:hover': {
        bg: 'dark',
      },
    },
  },
  button: {
    primary: {
      bg: 'primary',
    },

    secondary: {
      bg: 'secondary',
    },

    lg: {
      fontSize: 'x-large',
    },

    sm: {
      fontSize: 'x-small',
    },

    round: {
      variant: 'button.sm',
      overflow: 'hidden',
      borderRadius: '50%',
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

const theme = {
  ...baseTheme,
  variants,
  components: {
    MyDiv: {
      baseStyle: {},
      sizes: {
        sm: {},
        md: {},
        lg: {},
      },
      variants: {
        outline: {},
      },
      defaultOptions: {
        variant: 'outline',
        size: 'md',
      },
      slots: {
        ChildMyDiv1: {
          baseStyle: {},
          sizes: {},
          variants: {},
          defaultOptions: {},
        },
        ChildMyDiv2: {
          baseStyle: {},
          sizes: {},
          variants: {},
          defaultOptions: {},
        },
      },
    },
  },
} as const;

export { theme };
