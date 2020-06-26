import * as React from 'react';
import {
  quark,
  QuarkOptions,
  QuarkHTMLProps,
  ThemedStyle,
} from '@gumption-ui/quark';
import { ResponsiveStyleValue } from '@gumption-ui/utils';

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
  useHook: {
    useOptions: ({ align, ...options }) => ({
      _css: {
        // first try css grid
        display: 'grid',
        gridAutoColumns: '100%',
        gap: options.space,
        justifyItems: align,

        '@supports': {
          'not (display: grid)': {
            // else switch to flexbox
            display: 'flex',
            flexDirection: 'column',
            alignItems: align === 'center' ? align : `flex-${align}`,
          },
        },
      },
      ...options,
    }),
    useProps: ({ space }, { children: stackChildren, ...htmlProps }) => {
      const children = React.Children.toArray(stackChildren).map(
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
