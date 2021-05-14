import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { kwark, createHook } from '..';

afterEach(cleanup);

describe('kwark', () => {
  test('renders', () => {
    const Kwark = kwark('div');
    const { asFragment } = render(<Kwark>Hello World</Kwark>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('render `style` attribute', () => {
    const Kwark = kwark('div');
    const { asFragment } = render(
      <Kwark style={{ color: 'red' }} className="hello-world">
        Hello World
      </Kwark>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('render wrapElement using `useHook` prop', () => {
    const Anchor = kwark('a');
    type AnchorHTMLProps = React.HTMLAttributes<any> &
      React.AnchorHTMLAttributes<any> & {
        /**
         * Function returned by the hook to wrap the element to which html props
         * will be passed.
         */
        wrapElement?: (element: React.ReactNode) => React.ReactNode;
      };
    const useHook = createHook<{ myProp: string }, AnchorHTMLProps>({
      name: 'Kwark',
      keys: ['myProp'],
      useProps: ({ myProp }, htmlProps) => ({
        ...htmlProps,
        wrapElement: (element) => <Anchor>:{element}:</Anchor>,
        className: `${htmlProps.className} ${myProp}`,
      }),
    });
    const Kwark = kwark('div', {
      useHook,
    });
    const { asFragment } = render(
      <Kwark className="child-element" myProp="world">
        Hello
      </Kwark>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
