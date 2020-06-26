import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { quark } from '..';

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
});
