/** @jsx OtionStyling.jsx */

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as OtionStyling from '..';

afterEach(cleanup);

describe('otion', () => {
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

  test('returns responsive interpolated styles', () => {
    const { asFragment } = render(
      <div
        css={{
          color: 'primary',
          padding: ['small', 'medium', 'large'],
          margin: [undefined, 'medium', undefined],
          ':hover': [{ width: 'small' }, { width: 'medium' }],
        }}
        className="satori"
      >
        Responsive stles
      </div>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('functional values can return responsive arrays', () => {
    const { asFragment } = render(
      <div
        css={{
          color: (t) => [t.scales?.colors.primary, t.scales?.colors.secondary],
        }}
        className="satori"
      >
        Responsive styles
      </div>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('returns selectors interpolated styles', () => {
    const { asFragment } = render(
      <div
        css={{
          selectors: {
            '& > * + *': {
              color: 'primary',
            },
            '&:focus, &:active': {
              color: 'primary',
            },
          },
        }}
        className="satori"
      >
        selectors styles
      </div>,
    );
    expect(asFragment()).toMatchSnapshot();

    // const result = interpolate({
    //   selectors: {
    //     '& > * + *': {
    //       color: 'primary',
    //     },
    //     '&:focus, &:active': {
    //       color: 'primary',
    //     },
    //   },
    // })({ theme });
    // expect(result).toEqual({
    //   selectors: {
    //     '& > * + *': {
    //       color: 'tomato',
    //     },
    //     '&:focus, &:active': {
    //       color: 'tomato',
    //     },
    //   },
    // });
  });

  // test('returns responsive selectors interpolated styles', () => {
  //   const result = interpolate({
  //     selectors: [
  //       {
  //         '& > * + *': {
  //           color: 'primary',
  //         },
  //         '&:focus, &:active': {
  //           color: 'primary',
  //         },
  //       },
  //       {
  //         '& > * + *': {
  //           color: 'secondary',
  //         },
  //         '&:focus, &:active': {
  //           color: 'secondary',
  //         },
  //       },
  //     ],
  //   })({ theme });
  //   expect(result).toEqual({
  //     selectors: {
  //       '& > * + *': {
  //         color: 'tomato',
  //       },
  //       '&:focus, &:active': {
  //         color: 'tomato',
  //       },
  //     },
  //     '@media': {
  //       '(min-width: 640px)': {
  //         selectors: {
  //           '& > * + *': {
  //             color: 'cyan',
  //           },
  //           '&:focus, &:active': {
  //             color: 'cyan',
  //           },
  //         },
  //       },
  //     },
  //   });
  // });

  // test('returns at-rule interpolated styles', () => {
  //   const result = interpolate({
  //     '@media': {
  //       '(min-width: 600px)': {
  //         color: 'primary',
  //       },
  //     },
  //     '@supports': {
  //       '(display: grid)': {
  //         color: 'primary',
  //       },
  //     },
  //   })(theme);
  //   expect(result).toEqual({
  //     '@media': {
  //       '(min-width: 600px)': {
  //         color: 'tomato',
  //       },
  //     },
  //     '@supports': {
  //       '(display: grid)': {
  //         color: 'tomato',
  //       },
  //     },
  //   });
  // });

  //   test('returns at-rule interpolated styles', () => {
  //     const result = interpolate({
  //       '@media': {
  //         '(min-width: 600px)': {
  //           ':hover': {
  //             color: 'primary',
  //           },
  //         },
  //       },
  //       '@supports': {
  //         '(display: grid)': {
  //           ':hover': {
  //             color: 'primary',
  //           },
  //         },
  //       },
  //     })(theme);
  //     expect(result).toEqual({
  //       '@media': {
  //         '(min-width: 600px)': {
  //           ':hover': {
  //             color: 'tomato',
  //           },
  //         },
  //       },
  //       '@supports': {
  //         '(display: grid)': {
  //           ':hover': {
  //             color: 'tomato',
  //           },
  //         },
  //       },
  //     });
  //   });
});
