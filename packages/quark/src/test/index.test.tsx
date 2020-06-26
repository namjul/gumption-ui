import * as React from 'react';
import renderer from 'react-test-renderer';
import { quark } from '..';

const renderJSON = (el: React.ReactElement) => renderer.create(el).toJSON();

describe('Quark', () => {
  test('renders', () => {
    const Quark = quark('div');
    expect(<Quark>Hello</Quark>).toMatchSnapshot();
  });

  test('render attributes', () => {
    const Quark = quark('div', { attrs: { id: 'foo' } });
    expect(<Quark className="satori">Hello</Quark>).toMatchSnapshot();
  });

  test('render with baseStyle', () => {
    const Quark = quark('div', { baseStyle: { color: 'red' } });
    const json = renderJSON(<Quark>Hello</Quark>);
    expect(json).toMatchSnapshot();
  });

  test('render with merged className', () => {
    const Quark = quark('div', { baseStyle: { color: 'red' } });
    const json = renderJSON(<Quark className="satori">Hello</Quark>);
    expect(json).toMatchSnapshot();
  });

  test('render `style` attribute', () => {
    const Quark = quark('div');
    const json = renderJSON(<Quark style={{ color: 'red' }}>Hello</Quark>);
    expect(json).toMatchSnapshot();
  });

  test('render with `css` prop', () => {
    const Quark = quark('div');
    const json = renderJSON(<Quark css={{ color: 'red' }}>Hello</Quark>);
    expect(json).toMatchSnapshot();
  });

  test('render with `_css` prop', () => {
    const Quark = quark('div');
    const json = renderJSON(<Quark _css={{ color: 'red' }}>Hello</Quark>);
    expect(json).toMatchSnapshot();
  });

  test('render with `wrapElement` prop', () => {
    const Quark = quark('div');
    const Anchor = quark('a');
    const json = renderJSON(
      <Quark wrapElement={(element) => <Anchor>{element}</Anchor>}>
        Hello
      </Quark>,
    );
    expect(json).toMatchSnapshot();
  });
});
