import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { kwark, KwarkOptions, createHook } from '..';

afterEach(cleanup);

describe('kwark', () => {
  test('renders', () => {
    const Kwark = kwark('div');
    const { asFragment } = render(<Kwark>Hello</Kwark>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('render `style` attribute', () => {
    const Kwark = kwark('div');
    const { asFragment } = render(
      <Kwark style={{ color: 'red' }}>Hello</Kwark>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('render with `useHook` prop', () => {
    const Anchor = kwark('a');
    type AnchorHTMLProps = React.HTMLAttributes<any> &
      React.AnchorHTMLAttributes<any> & {
        /**
         * Function returned by the hook to wrap the element to which html props
         * will be passed.
         */
        wrapElement?: (element: React.ReactNode) => React.ReactNode;
      };
    const useHook = createHook<KwarkOptions, AnchorHTMLProps>({
      name: 'Kwark',
      useProps: (_, htmlProps) => ({
        wrapElement: (element) => <Anchor>:{element}:</Anchor>,
        ...htmlProps,
      }),
    });
    const Kwark = kwark('div', {
      useHook,
    });
    const { asFragment } = render(<Kwark>Hello</Kwark>);
    expect(asFragment()).toMatchSnapshot();
  });
});
