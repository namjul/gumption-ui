# JSX

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
