/* eslint-disable no-console */
import * as React from 'react';
import 'destyle.css';
import base from '@gumption-ui/theme-base';
import {
  ThemeProvider,
  quark,
  QuarkOptions,
  QuarkHTMLProps,
} from '@gumption-ui/quark';
import { Box } from '@gumption-ui/box';
import { Stack } from '@gumption-ui/stack';

const theme = {
  ...base,
};

const Quark = quark('div');

const Header = quark('header', {
  themeKey: 'Header',
  slots: {
    a: {
      color: 'blue',
      textDecoration: 'none',
    },
    Title: {
      color: 'primary',
    },
  },
});
const Title = quark<'h1', QuarkOptions & { title: string }, QuarkHTMLProps>(
  'h1',
  {
    themeKey: 'Header.Title',
    keys: ['title'],
    useHook: {
      useOptions: (options) => {
        console.log('Title option', options);
        return {
          _css: { padding: '40px', backgroundColor: 'orange' },
          ...options,
        };
      },
      useProps: (options, { children, ...props }) => {
        console.log('Title props', props);
        return {
          children: options.title || children,
          ...props,
        };
      },
    },
  },
);
const Link = quark('a', { themeKey: 'Link' });
const Test = quark(Title);

const Flex = quark('div', { baseStyle: { display: 'flex' } });

const Placeholder = quark(Box, {
  baseStyle: {
    backgroundColor: 'gray.1',
  },
});

export const Root = () => (
  <ThemeProvider theme={theme}>
    <Box maxWidth="300px">
      <quark.h1>Stack</quark.h1>
      <quark.pre>Space: xx-small</quark.pre>
      <Stack space="xx-small">
        <Placeholder height={50} />
        <Placeholder height={50} />
        <Placeholder height={50} />
      </Stack>
      <quark.pre>Space: medium</quark.pre>
      <Stack space="medium">
        <Placeholder height={50} />
        <Placeholder height={50} />
        <Placeholder height={50} />
      </Stack>
      <quark.pre>Space: xx-large</quark.pre>
      <Stack space="xx-large">
        <Placeholder height={50} />
        <Placeholder height={50} />
        <Placeholder height={50} />
      </Stack>
      <quark.pre>Responsive Space</quark.pre>
      <Stack space={['xx-small', 'medium', 'xx-large']}>
        <Placeholder height={50} />
        <Placeholder height={50} />
        <Placeholder height={50} />
      </Stack>
      <quark.pre>Align center</quark.pre>
      <Stack align="center" space="small">
        <Placeholder height={40} width={40} />
        <Placeholder height={40} width={60} />
        <Placeholder height={40} width={80} />
      </Stack>
      <quark.pre>Align left</quark.pre>
      <Stack align="start" space="small">
        <Placeholder height={40} width={40} />
        <Placeholder height={40} width={60} />
        <Placeholder height={40} width={80} />
      </Stack>
      <quark.pre>Align right</quark.pre>
      <Stack align="end" space="small">
        <Placeholder height={40} width={40} />
        <Placeholder height={40} width={60} />
        <Placeholder height={40} width={80} />
      </Stack>
    </Box>
    <quark.pre css={{ overflow: 'auto' }}>
      kasd fkadföka df ajds faö dfaöl kdfak dlka döfa dsöf kads fads fads
    </quark.pre>
    <quark.fieldset>sdf</quark.fieldset>
    <Quark
      as={Box}
      padding="x-large"
      display="inline-block"
      backgroundColor="gray.3"
    >
      polymorhpism with `Box` as` prop
    </Quark>
    <Box
      margin={['small', 'medium', 'large']}
      padding="xx-large"
      flexBasis="x-large"
      fontSize="large"
    >
      Box
    </Box>
    <Flex
      data-hover="jo"
      as="a"
      target="_blank"
      css={{
        justifyContent: 'center',
        selectors: {
          '&:hover': { color: 'red', backgroundColor: 'blue' },
          "&[target='_blank']::after": {
            content: "'↗'",
          },
          '& > * + *': {
            marginLeft: 16,
            marginRight: 16,
          },
          /*
          '&:hover, &[data-hover], &[data-state=hover]': {
            color: 'red',
            backgroundColor: 'blue',
          },
          '&:focus, &:active': {
            outline: 'solid',
          },
       */
        },
      }}
    >
      <quark.a
        target="_blank"
        css={{
          selectors: {
            '&::after': {
              content: "'↗'",
            },
          },
        }}
      >
        a link
      </quark.a>
      <quark.div>my div</quark.div>
      <quark.p>my p</quark.p>
    </Flex>
    <Header>
      header
      <quark.a href="#">a link</quark.a>
      <Title title="jo">title</Title>
    </Header>
    <Test>test</Test>
    <Box as={Link}>
      box as <quark.strong>Link</quark.strong>
    </Box>
    {/* <Quark as="a" href="#" css={{ padding: 'small'}} className="jo" _css={{ padding: 'large' }}> */}
    {/*   This is my box */}
    {/* </Quark> */}
    <Quark as="a" href="#">
      This is my box
      <Quark>quark</Quark>
    </Quark>
    <Quark css={{ backgroundColor: 'red' }}>This is my element</Quark>
    <Quark as="a" href="#">
      This is my box
    </Quark>
    {/* <Quark as="a" href="#" asdfasdf="löasdf"> */}
    {/*   This is my box */}
    {/* </Quark> */}
    {/* <Quark href="#" data-asdfasdf="löasdf"> */}
    {/*   This is my box */}
    {/* </Quark> */}
    <Quark
      css={{
        backgroundColor: 'green',
        selectors: {
          '& > * + *': {
            marginLeft: 16,
          },
        },
      }}
      _css={{
        padding: 1,
        margin: 30,
        paddingY: 'medium',
        bg: 'orange',
        marginTop: ['small', 'medium', 'large'],
      }}
    >
      This is my box
    </Quark>
  </ThemeProvider>
);
