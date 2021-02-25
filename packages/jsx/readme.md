# JSX

## Catching the spark

1. Find a _felt sense_ of the general topic you'r interested in.
   a. Curiosity
   b. Courageous
   c. Inspired
2. Offer some words and images to your felt sense

- Simplicity
- Ergonimics
- Direct / Without indirection
- Shiny
- Engaging / Something new to learn
- Resusing existing solutions
- reduce the number of concepts

3. Weave some of those handles into a statement about your topic.
   a. I want it to feel appropiately engaging and for that it must be simple enough to enable that.
   b. There is a sense of finding existing patterns in the eco-system and using that instead of creating my own.
   c. Things that are easily accessible have a higher value return in the short-term. But it should also bring those in the long-term
   d. For that it should be open for extention and have a good baseline for most usecases.
4. Tinker with your story statement
   a. Proposition: Building on well understood and tested foundations (`jsx pragma`) this tool might have a stronger lindy effect.
   b. Proposition: Seing through the frabic of relations i believe `jsx pragma` is the better abstraction.
   c. Proposition: This enables to build `quark` on top of `jsx pragma`.

```ts
declare global {
  namespace JSX {}
}
```

```ts
import { SxProps } from './types';
declare module 'react' {
  interface DOMAttributes<T> extends SxProps {}
}
declare global {
  namespace JSX {
    interface IntrinsicAttributes extends SxProps {}
  }
}
```

```tsx
import { extendTheme } from '@gumption-ui/react';
// 1. define component configuration
const components = {
  CustomBadge: {
    baseStyle: ({ colorMode }) => ({
      bg: colorMode === 'dark' ? 'green.300' : 'green.500',
      color: colorMode === 'dark' ? 'gray.800' : 'white',
      textTransform: 'uppercase',
      fontWeight: 'semibold',
      letterSpacing: '0.02em',
      padding: '4px',
      borderRadius: '2px',
      fontSize: '12px',
    }),
  },
};
// 2. Call `extendTheme` and pass your custom values`
const theme = extendTheme({ components });
// 3. Use it in your components
function CustomBadge(props) {
  const { size, variant, ...rest } = props;

  // this
  const styles = useStyleConfig('CustomBadge', { size, variant });
  return <span sx={styles} {...rest} />;

  // or this
  const styleConfigProps = useStyleConfig('CustomBadge', { size, variant });
  // styleConfigProps contains `_sx`, `wrapElement`, ...
  return <span {...styleConfigProps} {...rest} />;

  // or this
  return (
    <span
      sx={styles}
      themeKey="CustomBadge"
      size={size}
      variant={variant}
      {...rest}
    />
  );

  // render function works too
  return (
    <span sx={styles} {...rest}>
      {(props) => <span {...props} />}
    </span>
  );
}
// 4. Use the component
render(<CustomBadge>I am a custom badge</CustomBadge>);
```

# Links

- https://www.typescriptlang.org/docs/handbook/jsx.html
- https://github.com/microsoft/TypeScript/issues/8757
- https://fettblog.eu/typescript-react-extending-jsx-elements/
- https://stackoverflow.com/questions/48450470/how-can-i-extend-the-attributes-of-jsx-elements-in-typescript-tsx-code
- https://github.com/system-ui/theme-ui/tree/develop/packages/core
- https://github.com/system-ui/theme-ui/blob/v0.4.0-rc.14/packages/core/src/react-jsx.ts
- https://dev.to/segunadebayo/migrating-to-react-17-and-fixing-the-jsx-runtime-error-with-emotion-l4n
- https://babeljs.io/docs/en/babel-preset-react#importsource
- https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md#motivation
- https://www.google.com/search?q=pragma+and+pragmaFrag+cannot+be+set+when+runtime+is+automatic
- https://github.com/emotion-js/emotion/tree/master/packages/react
