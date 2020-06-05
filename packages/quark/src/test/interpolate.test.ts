import { interpolate, Theme } from '..';
import { defaultTokens } from '../defaultTokens';

const theme: Theme = {
  ...defaultTokens,
};

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

test('returns responsive interpolated styles', () => {
  const result = interpolate({
    color: 'primary',
    padding: [2, 3, 4],
    margin: [undefined, 3, undefined],
  })(theme);
  expect(result).toEqual({
    padding: 16,
    '@media': {
      '(min-width: 640px)': {
        margin: 24,
        padding: 24,
      },
      '(min-width: 768px)': {
        padding: 32,
      },
    },
    color: 'tomato',
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
    px: '2',
  })(theme);
  expect(result).toEqual({
    paddingLeft: 16,
    paddingRight: 16,
  });
});
