import { theme as baseTheme } from '@gumption-ui/theme-base';

const variants = {
  text: {
    caps: {
      fontSize: ['small', 'medium'],
      textDecoration: 'uppercase',
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
};

export const theme = {
  ...baseTheme,
  variants,
} as const;
