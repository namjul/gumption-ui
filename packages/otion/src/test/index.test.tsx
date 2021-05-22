import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, useStyleConfig } from '..';

afterEach(cleanup);

describe('otion', () => {
  test('renders', () => {
    const Component = () => {
      const elementProps = useStyleConfig(
        { themeKey: 'Button', size: 'sm' },
        { id: 'my-id' },
      );
      return <>{JSON.stringify(elementProps, null, 2)}</>;
    };

    const { asFragment } = render(
      <ThemeProvider
        theme={{
          components: {
            Button: {
              baseStyle: {
                px: 4,
                py: 8,
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
            },
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
          "px": 4,
          "py": 8,
          "fontSize": 4
        },
        "id": "my-id"
      }
      </DocumentFragment>
    `);
  });
});
