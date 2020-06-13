# Theme concepts

## Sizes

style-object vs single value to set width/height

```typescript
Button: {
  sizes: {
    small: {
      padding: "12px",
      fontSize: "14px",
    },
    large: {
      padding: "24px",
      fontSize: "18px",
    },
  }
}
```

## Variants

```typescript
Button: {
  variants: {
    primary: {
      // ..some styles
    },
    secondary: {
      // ..some styles
    }
  }
}
```

## Slots

```typescript
// inside <Quark component="Button" />
<SlotProvider slots={Button.slots}>{children}</SlotProvider>;

// inside <Quark component="Icon" />
props = useSlot('Icon');

// inside theme
Button: {
  slots: {
    Icon: {
      // ..some styles
    }
  }
}
```

## Pseudos

# Scratchpad

```typescriptreact

// Following idea from https://github.com/jamesknelson/use-sx

const inputStyle = {
  borderWidth: [1,2,3],
  borderColor: {
    default: ['black', 'gray', 'orange'],
    ':hover': ['blue', 'red', 'yellow'],
  },
  selectors: {
    "[target='_blank']::after": {
        content: "'↗'",
    },
  },
}

const outputStyle = {
  borderWidth: 1,
  borderColor: 'black',
  ':hover': {
    borderColor: 'blue',
  }
  '@media': {
    '(min-width: 640px)': {
      borderWidth: 2,
      borderColor: 'gray',
      ':hover': {
        borderColor: 'red',
      }
    },
    '(min-width: 768px)': {
      borderWidth: 3,
      borderColor: 'orange',
      ':hover': {
        borderColor: 'yellow',
      }
    },
  },
}
```

# Atomic css

- https://www.styletron.org/concepts/#selectors

# Inspiration

- https://github.com/siddharthkp/react-ui
- https://github.com/system-ui/theme-ui
- https://github.com/styled-system/styled-system
- https://github.com/kripod/glaze
- https://github.com/jamesknelson/use-sx
- https://github.com/chakra-ui/chakra-ui
