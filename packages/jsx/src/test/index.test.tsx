/** @jsx jsx ../ */

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jsx } from '..';

afterEach(cleanup);

describe('otion', () => {
  test('renders', () => {
    const { asFragment } = render(<div>Hello World</div>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('render `style` attribute', () => {
    const { asFragment } = render(
      <div style={{ color: 'red' }}>Hello World</div>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('render `class` attribute', () => {
    const { asFragment } = render(<div className="Hello">World</div>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('interpret `compileStyles` attribute', () => {
    const { asFragment } = render(
      <div
        style={{ color: 'red' }}
        className="let gumption"
        compileStyles={(props) => ({
          ...props,
          className: `${props.className} come to you`,
        })}
      >
        Hello World
      </div>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
