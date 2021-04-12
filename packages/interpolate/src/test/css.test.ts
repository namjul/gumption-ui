import { get } from '@gumption-ui/utils';
import { interpolate } from '..';
import { theme } from './theme';

test('returns a function', () => {
  const result = interpolate();
  expect(typeof result).toBe('function');
});

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

test('returns responsive interpolated styles', () => {
  const result = interpolate({
    color: 'primary',
    padding: ['small', 'medium', 'large'],
    margin: [undefined, 'medium', undefined],
    ':hover': [{ width: 'small' }, { width: 'medium' }],
  })(theme);
  expect(result).toEqual({
    padding: 16,
    ':hover': {
      width: 16,
    },
    '@media': {
      '(min-width: 640px)': {
        margin: 24,
        padding: 24,
        ':hover': {
          width: 24,
        },
      },
      '(min-width: 768px)': {
        padding: 32,
      },
    },
    color: 'tomato',
  });
});

test('functional values can return responsive arrays', () => {
  const result = interpolate({
    color: (t) => [t?.scales?.colors.primary, t?.scales?.colors.secondary],
  })(theme);
  expect(result).toEqual({
    color: 'tomato',
    '@media': {
      '(min-width: 640px)': {
        color: 'cyan',
      },
    },
  });
});

test('returns selectors interpolated styles', () => {
  const result = interpolate({
    selectors: {
      '& > * + *': {
        color: 'primary',
      },
      '&:focus, &:active': {
        color: 'primary',
      },
    },
  })({ theme });
  expect(result).toEqual({
    selectors: {
      '& > * + *': {
        color: 'tomato',
      },
      '&:focus, &:active': {
        color: 'tomato',
      },
    },
  });
});

test('returns responsive selectors interpolated styles', () => {
  const result = interpolate({
    selectors: [
      {
        '& > * + *': {
          color: 'primary',
        },
        '&:focus, &:active': {
          color: 'primary',
        },
      },
      {
        '& > * + *': {
          color: 'secondary',
        },
        '&:focus, &:active': {
          color: 'secondary',
        },
      },
    ],
  })({ theme });
  expect(result).toEqual({
    selectors: {
      '& > * + *': {
        color: 'tomato',
      },
      '&:focus, &:active': {
        color: 'tomato',
      },
    },
    '@media': {
      '(min-width: 640px)': {
        selectors: {
          '& > * + *': {
            color: 'cyan',
          },
          '&:focus, &:active': {
            color: 'cyan',
          },
        },
      },
    },
  });
});

test('returns at-rule interpolated styles', () => {
  const result = interpolate({
    '@media': {
      '(min-width: 600px)': {
        color: 'primary',
      },
    },

    '@supports': {
      '(display: grid)': {
        color: 'primary',
      },
    },
  })(theme);
  expect(result).toEqual({
    '@media': {
      '(min-width: 600px)': {
        color: 'tomato',
      },
    },
    '@supports': {
      '(display: grid)': {
        color: 'tomato',
      },
    },
  });
});

test('returns at-rule interpolated styles', () => {
  const result = interpolate({
    '@media': {
      '(min-width: 600px)': {
        ':hover': {
          color: 'primary',
        },
      },
    },

    '@supports': {
      '(display: grid)': {
        ':hover': {
          color: 'primary',
        },
      },
    },
  })(theme);
  expect(result).toEqual({
    '@media': {
      '(min-width: 600px)': {
        ':hover': {
          color: 'tomato',
        },
      },
    },
    '@supports': {
      '(display: grid)': {
        ':hover': {
          color: 'tomato',
        },
      },
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
