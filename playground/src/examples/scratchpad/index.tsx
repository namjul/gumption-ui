/* eslint-disable no-console */

import * as React from 'react';
import 'destyle.css';
import { kwark, createHook } from '@gumption-ui/kwark';
import {
  CssProp,
  ThemeProvider,
  kwark as otionKwark,
  createHook as otionCreateHook,
  OtionHTMLProps,
} from '@gumption-ui/otion';
import { jsxDEV as jsx } from '@gumption-ui/otion/jsx-dev-runtime';
import { Box } from '@gumption-ui/box';
// import { Stack } from '@gumption-ui/stack';
import { theme } from '../../theme';
import { WithPragma } from './jsx-pragma';

const useMyDiv = otionCreateHook<{}, OtionHTMLProps>({
  useProps: (_, htmlProps) => ({
    'data-test': 'my data attibute',
    ...htmlProps,
  }),
});

const MyDiv = otionKwark('div', {
  useHook: useMyDiv,
  themeKey: 'MyDiv',
  baseStyle: {
    boxSizing: 'border-box',
  },
  variant: 'outline',
  size: 'sm',
});

const Kwark = kwark<'div', CssProp>('div', {
  memo: true,
  useCreateElement: jsx,
});

type RoleHTMLProps = React.HTMLAttributes<any> &
  React.RefAttributes<any> & {
    wrapElement?: (element: React.ReactNode) => React.ReactNode;
  };

export type AnchorHTMLProps = React.HTMLAttributes<any> &
  React.AnchorHTMLAttributes<any> & {
    /**
     * Function returned by the hook to wrap the element to which html props
     * will be passed.
     */
    wrapElement?: (element: React.ReactNode) => React.ReactNode;
  };

type Config = {
  themeKey?: string;
  variant?: string;
  size?: string;
};

const useStyleConfig = createHook<Config, RoleHTMLProps>({
  keys: ['variant', 'size', 'themeKey'],
  // useProps: (options, { css, ...htmlProps }) => {
  //   const theme = useTheme();
  //   const optionsWithTheme = { ...options, theme };
  //   const computedStyles: ThemedStyle = {
  //     ...baseStyles(optionsWithTheme),
  //     ...modifierStyle(optionsWithTheme),
  //     ...useSlotStyles(name),
  //     ...css,
  //   };
  //
  //   return {
  //     ...htmlProps,
  //     css: computedStyles,
  //   };
  // },
});

type KwarkOptions = {
  variant: string;
  size: string;
};

type AnchorWithHookOptionsType = KwarkOptions & Config;

const useHook = createHook<AnchorWithHookOptionsType, AnchorHTMLProps>({
  // name: 'AnchorWithHook',
  useProps: useStyleConfig,
});

console.log('useHook.name', useHook.name);

const AnchorWithHook = kwark<typeof Kwark, KwarkOptions & CssProp>(Kwark, {
  name: 'Jo',
  memo: true,
  useHook,
  useCreateElement: jsx,
});

// const Header = quark('header', {
//   themeKey: 'Header',
//   slots: {
//     a: {
//       color: 'orange',
//       textDecoration: 'none',
//     },
//     Title: {
//       color: 'blue',
//     },
//   },
// });
//
// const Title = quark<'h1', QuarkOptions & { title: string }, QuarkHTMLProps>(
//   'h1',
//   {
//     themeKey: 'Header.Title',
//     keys: ['title'],
//     useHook: {
//       useOptions: (options) => {
//         return {
//           _css: { padding: '40px', backgroundColor: 'orange' },
//           ...options,
//         };
//       },
//       useProps: (options, { children, ...props }) => {
//         return {
//           children: options.title || children,
//           ...props,
//         };
//       },
//     },
//   },
// );
// const Link = quark('a', { themeKey: 'Link' });
// const Test = quark(Title);
//
// const Flex = quark('div', { baseStyle: { display: 'flex' } });
//
// const Placeholder = quark(Box, {
//   baseStyle: {
//     backgroundColor: 'gray.9',
//     borderWidth: 5,
//     borderColor: 'gray.1',
//     borderStyle: 'solid',
//   },
// });

export const Root = () => (
  <ThemeProvider theme={theme}>
    <Box
      maxWidth="300px"
      backgroundColor="gray.9"
      padding="small"
      color="gray.1"
    >
      <WithPragma />
      <hr />
      <otionKwark.span>I am a otionKwark span</otionKwark.span>
      <MyDiv
        as="a"
        href="#"
        data-asdf="asdf"
        variant=""
        css={{ backgroundColor: 'orange' }}
      >
        MyDiv
        <MyDiv>MyDiv inside MyDiv</MyDiv>
      </MyDiv>
      <Kwark css={{ color: 'secondary' }} href="#" as="a">
        {(props) => {
          return (
            <span style={{ backgroundColor: 'red' }} {...props}>
              Kwark Content
            </span>
          );
        }}
      </Kwark>
      <AnchorWithHook
        css={{ color: 'secondary', fontSize: 'large' }}
        variant="a"
        size="b"
      >
        AnchorWithHook
      </AnchorWithHook>
      <Kwark css={{ color: 'orange', backgroundColor: 'black' }}>
        jo Kwark
      </Kwark>
      {/* <quark.h1>Stack</quark.h1> */}
      {/* <quark.pre>Space: xx-small</quark.pre> */}
      {/* <Stack space="xx-small"> */}
      {/*   <Placeholder height={50} /> */}
      {/*   <Placeholder height={50} /> */}
      {/*   <Placeholder height={50} /> */}
      {/* </Stack> */}
      {/* <quark.pre>Space: medium</quark.pre> */}
      {/* <Stack space="medium"> */}
      {/*   <Placeholder height={50} /> */}
      {/*   <Placeholder height={50} /> */}
      {/*   <Placeholder height={50} /> */}
      {/* </Stack> */}
      {/* <quark.pre>Space: xx-large</quark.pre> */}
      {/* <Stack space="xx-large"> */}
      {/*   <Placeholder height={50} /> */}
      {/*   <Placeholder height={50} /> */}
      {/*   <Placeholder height={50} /> */}
      {/* </Stack> */}
      {/* <quark.pre>Responsive Space</quark.pre> */}
      {/* <Stack space={['xx-small', 'medium', 'xx-large']}> */}
      {/*   <Placeholder height={50} /> */}
      {/*   <Placeholder height={50} /> */}
      {/*   <Placeholder height={50} /> */}
      {/* </Stack> */}
      {/* <quark.pre>Responsive Align</quark.pre> */}
      {/* <Stack align={['start', 'center', 'end']}> */}
      {/*   <Placeholder height={50} width={40} /> */}
      {/*   <Placeholder height={50} width={60} /> */}
      {/*   <Placeholder height={50} width={80} /> */}
      {/* </Stack> */}
      {/* <quark.pre>Align center</quark.pre> */}
      {/* <Stack align="center" space="small"> */}
      {/*   <Placeholder height={40} width={40} /> */}
      {/*   <Placeholder height={40} width={60} /> */}
      {/*   <Placeholder height={40} width={80} /> */}
      {/* </Stack> */}
      {/* <quark.pre>Align left</quark.pre> */}
      {/* <Stack align="start" space="small"> */}
      {/*   <Placeholder height={40} width={40} /> */}
      {/*   <Placeholder height={40} width={60} /> */}
      {/*   <Placeholder height={40} width={80} /> */}
      {/* </Stack> */}
      {/* <quark.pre>Align right</quark.pre> */}
      {/* <Stack align="end" space="small"> */}
      {/*   <Placeholder height={40} width={40} /> */}
      {/*   <Placeholder height={40} width={60} /> */}
      {/*   <Placeholder height={40} width={80} /> */}
      {/* </Stack> */}
      {/* <quark.pre>Nested</quark.pre> */}
      {/* <Stack space="small"> */}
      {/*   <Placeholder height={40} /> */}
      {/*   <Stack space="xx-small"> */}
      {/*     <Placeholder height={40} /> */}
      {/*     <Placeholder height={40} /> */}
      {/*     <Placeholder height={40} /> */}
      {/*   </Stack> */}
      {/*   <Placeholder height={40} /> */}
      {/* </Stack> */}
      {/* <quark.pre>With Fragments</quark.pre> */}
      {/* <Stack space="small"> */}
      {/*   <> */}
      {/*     <Placeholder height={50} /> */}
      {/*     <Placeholder height={50} /> */}
      {/*     <Placeholder height={50} /> */}
      {/*   </> */}
      {/* </Stack> */}
    </Box>
    {/* <quark.pre css={{ overflow: 'auto' }}> */}
    {/*   kasd fkadföka df ajds faö dfaöl kdfak dlka döfa dsöf kads fads fads */}
    {/* </quark.pre> */}
    {/* <quark.fieldset>sdf</quark.fieldset> */}
    {/* <Quark */}
    {/*   as={Box} */}
    {/*   padding="x-large" */}
    {/*   display="inline-block" */}
    {/*   backgroundColor="gray.3" */}
    {/* > */}
    {/*   polymorhpism with `Box` as` prop */}
    {/* </Quark> */}
    {/* <Box */}
    {/*   margin={['small', 'medium', 'large']} */}
    {/*   padding="xx-large" */}
    {/*   flexBasis="x-large" */}
    {/*   fontSize="large" */}
    {/* > */}
    {/*   Box */}
    {/* </Box> */}
    {/* <Flex */}
    {/*   data-hover="jo" */}
    {/*   as="a" */}
    {/*   target="_blank" */}
    {/*   css={{ */}
    {/*     justifyContent: 'center', */}
    {/*     selectors: { */}
    {/*       '&:hover': { color: 'red', backgroundColor: 'blue' }, */}
    {/*       "&[target='_blank']::after": { */}
    {/*         content: "'↗'", */}
    {/*       }, */}
    {/*       '& > * + *': { */}
    {/*         marginLeft: 16, */}
    {/*         marginRight: 16, */}
    {/*       }, */}
    {/*       '&:hover, &[data-hover], &[data-state=hover]': { */}
    {/*         color: 'red', */}
    {/*         backgroundColor: 'blue', */}
    {/*       }, */}
    {/*       '&:focus, &:active': { */}
    {/*         outline: 'solid', */}
    {/*       }, */}
    {/*     }, */}
    {/*   }} */}
    {/* > */}
    {/*   <quark.a */}
    {/*     target="_blank" */}
    {/*     css={{ */}
    {/*       selectors: { */}
    {/*         '&::after': { */}
    {/*           content: "'↗'", */}
    {/*         }, */}
    {/*       }, */}
    {/*     }} */}
    {/*   > */}
    {/*     a link */}
    {/*   </quark.a> */}
    {/*   <quark.div>my div</quark.div> */}
    {/*   <quark.p>my p</quark.p> */}
    {/* </Flex> */}
    {/* <Header> */}
    {/*   header */}
    {/*   <kwark.a href="#">a link</kwark.a> */}
    {/*   <Title title="jo">title</Title> */}
    {/* </Header> */}
    {/* <Test>test</Test> */}
    {/* <Box as={Link}> */}
    {/*   box as <quark.strong>Link</quark.strong> */}
    {/* </Box> */}
    {/* <Quark */}
    {/*   as="a" */}
    {/*   href="#" */}
    {/*   css={{ padding: 'small' }} */}
    {/*   className="jo" */}
    {/*   _css={{ padding: 'large' }} */}
    {/* > */}
    {/*   This is my box */}
    {/* </Quark> */}
    {/* <Quark as="a" href="#"> */}
    {/*   This is my box */}
    {/*   <Quark>quark</Quark> */}
    {/* </Quark> */}
    {/* <Quark css={{ backgroundColor: 'red' }}>This is my element</Quark> */}
    {/* <Quark as="a" href="#"> */}
    {/*   This is my box */}
    {/* </Quark> */}
    {/* <Quark as="a" href="#"> */}
    {/*   This is my box */}
    {/* </Quark> */}
    {/* <Quark data-asdfasdf="löasdf">This is my box</Quark> */}
    {/* <Quark */}
    {/*   css={{ */}
    {/*     backgroundColor: 'green', */}
    {/*     selectors: { */}
    {/*       '& > * + *': { */}
    {/*         marginLeft: 16, */}
    {/*       }, */}
    {/*     }, */}
    {/*   }} */}
    {/*   _css={{ */}
    {/*     padding: 1, */}
    {/*     margin: 30, */}
    {/*     paddingY: 'medium', */}
    {/*     bg: 'orange', */}
    {/*     marginTop: ['small', 'medium', 'large'], */}
    {/*   }} */}
    {/* > */}
    {/*   This is my box */}
    {/* </Quark> */}
  </ThemeProvider>
);
