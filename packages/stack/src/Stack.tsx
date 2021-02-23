import * as React from 'react';
import {
  quark,
  QuarkOptions,
  QuarkHTMLProps,
  ThemedStyle,
} from '@gumption-ui/quark';
import { ResponsiveStyleValue, toArray } from '@gumption-ui/utils';
import flattenChildren from 'react-keyed-flatten-children';

export type StackOptions = QuarkOptions & {
  space?: ThemedStyle['gap'];
  align?: ResponsiveStyleValue<'start' | 'center' | 'end'>;
};
export type StackHTMLProps = QuarkHTMLProps;
export type StackProps = StackOptions & StackHTMLProps;

const StackChild = quark('div', { themeKey: 'Stack.Child' });

export const Stack = quark<'div', StackOptions, StackHTMLProps>('div', {
  themeKey: 'Stack',
  keys: ['space', 'align'],
  baseStyle: {
    // first try css grid
    display: 'grid',
    gridAutoColumns: '100%',

    '@supports': {
      'not (display: grid)': {
        // else switch to flexbox
        display: 'flex',
        flexDirection: 'column',
      },
    },
  },
  useHook: {
    useOptions: (options) => ({
      _css: {
        gap: options.space,
        justifyItems: options.align,

        '@supports': {
          'not (display: grid)': {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            alignItems: toArray(options.align).map((align) =>
              align === 'center' ? align : `flex-${align}`,
            ),
          },
        },
      },
      ...options,
    }),
    useProps: ({ space }, { children: stackChildren, ...htmlProps }) => {
      const children = flattenChildren(stackChildren).map(
        (child, index, { length }) => (
          <StackChild
            css={{
              minWidth: '0px',
              // if flexbox does still not support `gap`
              ...(index < length - 1
                ? {
                    '@supports': {
                      'not (gap: 1px)': {
                        marginBottom: space,
                      },
                    },
                  }
                : undefined),
            }}
          >
            {child}
          </StackChild>
        ),
      );
      return { children, ...htmlProps };
    },
  },
});
