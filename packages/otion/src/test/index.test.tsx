import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, useStyleConfig } from '..';

const buttonStyleConfig = {
  baseStyle: {
    boxSizing: 'border-box',
  },
  sizes: {
    sm: {
      fontSize: 4,
    },
    md: {
      fontSize: 8,
    },
    lg: {
      fontSize: 16,
    },
  },
  variants: {
    outline: {
      borderRadius: 5,
    },
  },
} as const;

afterEach(cleanup);

describe('otion#useStyleConfig', () => {
  test('should resolve styles in `styleConfig` prop', () => {
    const Component = () => {
      const elementProps = useStyleConfig(
        {
          size: 'sm',
          variant: 'outline',
          styleConfig: buttonStyleConfig,
        },
        { id: 'my-id' },
      );
      return <>{JSON.stringify(elementProps, null, 2)}</>;
    };

    const { asFragment } = render(
      <ThemeProvider
        theme={{
          components: {
            Button: buttonStyleConfig,
          },
        }}
      >
        <Component />
      </ThemeProvider>,
    );
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        {
        "css": {
          "boxSizing": "border-box",
          "borderRadius": 5,
          "fontSize": 4
        },
        "id": "my-id"
      }
      </DocumentFragment>
    `);
  });

  test('should resolve styles in theme', () => {
    const Component = () => {
      const elementProps = useStyleConfig(
        {
          themeKey: 'Button',
          size: 'sm',
          variant: 'outline',
        },
        { id: 'my-id' },
      );
      return <>{JSON.stringify(elementProps, null, 2)}</>;
    };

    const { asFragment } = render(
      <ThemeProvider
        theme={{
          components: {
            Button: buttonStyleConfig,
          },
        }}
      >
        <Component />
      </ThemeProvider>,
    );
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        {
        "css": {
          "boxSizing": "border-box",
          "borderRadius": 5,
          "fontSize": 4
        },
        "id": "my-id"
      }
      </DocumentFragment>
    `);
  });
});
