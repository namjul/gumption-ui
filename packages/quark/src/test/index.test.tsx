import * as React from 'react';
import { render, cleanup, RenderOptions } from '@testing-library/react';
import '@testing-library/jest-dom';
import { quark, emptyTokens, ThemeProvider } from '..';

const theme = {
  ...emptyTokens,
  components: {
    Foo: {
      variants: {
        bar: {
          color: 'red',
        },
      },
      sizes: {
        large: {
          height: 16,
        },
      },
    },
  },
};

const customRender = (element: React.ReactElement, options?: RenderOptions) =>
  render(element, {
    wrapper: ({ children }: { children?: React.ReactNode }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
    ...options,
  });

afterEach(cleanup);

describe('Quark', () => {
  test('renders', () => {
    const Quark = quark('div');
    const { asFragment } = render(<Quark>Hello</Quark>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('render attributes', () => {
    const Quark = quark('div', { attrs: { id: 'foo' } });
    const { asFragment } = render(<Quark className="satori">Hello</Quark>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('render with baseStyle', () => {
    const Quark = quark('div', { baseStyle: { color: 'red' } });
    const { asFragment } = render(<Quark>Hello</Quark>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('render with merged className', () => {
    const Quark = quark('div', { baseStyle: { color: 'red' } });
    const { asFragment } = render(<Quark className="satori">Hello</Quark>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('render `style` attribute', () => {
    const Quark = quark('div');
    const { asFragment } = render(
      <Quark style={{ color: 'red' }}>Hello</Quark>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('render with `css` prop', () => {
    const Quark = quark('div');
    const { asFragment } = render(<Quark css={{ color: 'red' }}>Hello</Quark>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('render with `_css` prop', () => {
    const Quark = quark('div');
    const { asFragment } = render(<Quark _css={{ color: 'red' }}>Hello</Quark>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('render with `wrapElement` prop', () => {
    const Quark = quark('div');
    const Anchor = quark('a');
    const { asFragment } = render(
      <Quark wrapElement={(element) => <Anchor>{element}</Anchor>}>
        Hello
      </Quark>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('render modifiers from config', () => {
    const Quark = quark('div', {
      variants: {
        bar: {
          color: 'red',
        },
      },
      sizes: {
        large: {
          height: 16,
        },
      },
    });
    const { asFragment } = customRender(
      <Quark variant="bar" size="large">
        Hello
      </Quark>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('render modifiers from theme', () => {
    const Quark = quark('div', {
      themeKey: 'Foo',
    });
    const { asFragment } = customRender(
      <Quark variant="bar" size="large">
        Hello
      </Quark>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
