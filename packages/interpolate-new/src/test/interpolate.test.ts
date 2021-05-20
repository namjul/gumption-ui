import { get } from '@gumption-ui/utils';
import { theme as baseTheme } from '@gumption-ui/theme-base';
import { interpolate as createInterpolate } from '..';

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

const interpolate = createInterpolate();

describe('interpolate', () => {
  test('returns an object', () => {
    const result = interpolate()();
    expect(typeof result).toBe('object');
  });

  test('returns styles', () => {
    const result = interpolate({
      fontSize: 32,
      color: 'blue',
      borderRadius: 4,
    })();
    expect(result).toEqual({
      fontSize: 32,
      color: 'blue',
      borderRadius: 4,
    });
  });

  test('returns interpolated styles', () => {
    const result = interpolate({
      color: 'primary',
    })(theme);
    expect(result).toEqual({
      color: 'tomato',
    });
  });

  test('returns interpolated styles from function', () => {
    const result = interpolate((t) => ({
      color: t.scales?.colors.primary,
    }))(theme);
    expect(result).toEqual({
      color: 'tomato',
    });
  });

  test('returns interpolated styles as function', () => {
    const result = interpolate({
      color: (t) => t.scales?.colors.primary,
    })(theme);
    expect(result).toEqual({
      color: 'tomato',
    });
  });

  test('returns variants from theme', () => {
    const result = interpolate({
      variant: 'button.primary',
    })(theme);
    expect(result).toEqual({
      backgroundColor: 'tomato',
    });
  });

  test('returns nested variants from theme', () => {
    const result = interpolate({
      variant: 'button.round',
    })(theme);
    expect(result).toEqual({
      fontSize: 16,
      overflow: 'hidden',
      borderRadius: '50%',
    });
  });

  test('returns nested interpolated styles', () => {
    const result = interpolate({
      ':hover': {
        color: 'primary',
      },
    })(theme);
    expect(result).toEqual({
      ':hover': {
        color: 'tomato',
      },
    });
  });

  test('returns multiple variants from theme', () => {
    const result = interpolate({
      variant: 'button.primary button.sm',
    })(theme);
    expect(result).toEqual({
      backgroundColor: 'tomato',
      fontSize: 16,
    });
  });

  test('returns pseudo selectors interpolated styles', () => {
    const result = interpolate({
      ':hover': {
        color: 'primary',
      },
    })({ theme });
    expect(result).toEqual({
      ':hover': {
        color: 'tomato',
      },
    });
  });

  test('handles aliases and shorthands', () => {
    const result = interpolate({
      px: 'small',
    })(theme);
    expect(result).toEqual({
      paddingLeft: 16,
      paddingRight: 16,
    });
  });

  test('handles negative margins from scale', () => {
    const result = interpolate({
      mt: '-medium',
      mx: '-large',
    })(theme);
    expect(result).toEqual({
      marginTop: -24,
      marginLeft: -32,
      marginRight: -32,
    });
  });

  test('handles negative top, left, bottom, and right from scale', () => {
    const result = interpolate({
      top: '-x-small',
      right: '-large',
      bottom: '-medium',
      left: '-small',
    })(theme);
    expect(result).toEqual({
      top: -8,
      right: -32,
      bottom: -24,
      left: -16,
    });
  });

  test('handles negative margins from scale that is an object', () => {
    const result = interpolate({
      mt: '-small',
      mx: '-large',
    })(theme);
    expect(result).toEqual({
      marginTop: -16,
      marginLeft: -32,
      marginRight: -32,
    });
  });

  test('value as a function', () => {
    const result = interpolate({
      color: (t) => get(t, 'scales.colors.gray.0'),
    })(theme);
    expect(result).toEqual({
      color: '#F8F9F9',
    });
  });

  test('nested scale tokens', () => {
    const result = interpolate({
      color: 'text.subtle',
    })(theme);
    expect(result).toEqual({
      color: '#F8F9F9',
    });
  });
});
