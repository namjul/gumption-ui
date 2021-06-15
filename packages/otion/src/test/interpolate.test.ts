import { theme as baseTheme } from '@gumption-ui/theme-base';
import { interpolate } from '../parseProps';

export const theme = {
  ...baseTheme,
  components: {
    Button: {
      baseStyle: {
        boxSizing: 'border-box',
      },
      variants: {
        outline: {},
      },
      sizes: {
        sm: {},
        md: {},
        lg: {},
      },
    },
  },
} as const;

describe('interpolate(responsive) transform', () => {
  test('responsive value', () => {
    const result = interpolate({
      color: ['primary', 'secondary'],
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

  test('responsive value as function', () => {
    const result = interpolate({
      color: (t) => [t.scales?.colors.primary, t.scales?.colors.secondary],
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

  test('responsive value as object', () => {
    const result = interpolate({
      selectors: {
        selector1: {
          color: 'primary',
        },
        selector2: {
          backgroundColor: ['primary', 'secondary'],
        },
      },
    })(theme);
    expect(result).toEqual({
      selectors: {
        selector1: {
          color: 'tomato',
        },
        selector2: {
          '@media': {
            '(min-width: 640px)': {
              backgroundColor: 'cyan',
            },
          },
          backgroundColor: 'tomato',
        },
      },
    });
  });

  test('responsive styles', () => {
    const result = interpolate({
      color: 'primary',
      padding: ['small', 'medium', 'large'],
      margin: [undefined, 'medium', undefined],
      ':hover': [{ width: 'small' }, { width: 'medium' }],
    })(theme);
    expect(result).toEqual({
      color: 'tomato',
      padding: 16,
      ':hover': {
        width: 16,
      },
      '@media': {
        '(min-width: 640px)': {
          ':hover': {
            width: 24,
          },
          margin: 24,
          padding: 24,
        },
        '(min-width: 768px)': {
          padding: 32,
        },
      },
    });
  });

  test('responsive value as complex object', () => {
    const result = interpolate({
      selectors: {
        '& > * + *': {
          color: 'primary',
        },
        '&:focus, &:active': {
          color: 'primary',
        },
      },
    })(theme);
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

  test('returns variants from theme', () => {
    const result = interpolate({
      variant: 'buttons.primary',
    })(theme);
    expect(result).toEqual({
      backgroundColor: 'tomato',
      color: 'white',
    });
  });

  // test('returns multiple variants from theme', () => {
  //   const result = interpolate({
  //     variant: 'button.primary button.secondary',
  //   })(theme);
  //   expect(result).toEqual({
  //     backgroundColor: 'tomato',
  //     fontSize: 16,
  //   });
  // });
});
