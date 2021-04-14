/** @jsx jsx ../ */

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jsx } from '..';

afterEach(cleanup);

describe('kwark', () => {
  test('renders', () => {
    const { asFragment } = render(<div>Hello</div>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('render `style` attribute', () => {
    const { asFragment } = render(<div style={{ color: 'red' }}>Hello</div>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('render with `css` prop', () => {
    const { asFragment } = render(<div css={{ color: 'red' }}>Hello</div>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('render with merged className', () => {
    const { asFragment } = render(
      <div css={{ color: 'red' }} className="satori">
        Hello
      </div>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
