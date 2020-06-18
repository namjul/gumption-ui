# Principles

- overwrite or extend basic styling using css prop or `Box` component as escape hatch
- merge `className` and `style`
- merge event handlers
- no margin
- forward all props so that users can expect the respective HTML attributes to work
- `ref` to root for ability to set ref to the underlying DOM node
- responsive design by passing an array of values to system props
- overwrite or extend basic styling using css prop

# Theme concepts

## Ideas

## Overrides/Slots

- https://github.com/adobe-private/react-spectrum-v3/blob/master/packages/@react-spectrum/utils/src/Slots.tsx
- https://baseweb.design/guides/understanding-overrides/

```typescript
const Foo = quark('div', {
  overrides: {
    Bar: {
      options: {
        overrides: {
          Baz: {
            style: {

            }
          }
        }
      }
    }
  }
	slots: {
		Bar: {
	    style: {
	      color: '#892C21',
	    },
      options: {
        slots: {
          Baz: {
            style: {

            }
          }
        }
      },
      htmlProps: {
        'data-test-id': 'dnd-list-label',
      },
		}
	}
})
```

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

Following idea from https://github.com/jamesknelson/use-sx

active
checked
disabled
focus
focusWithin
hover

```typescriptreact

css={{
  // 1
  color: {
    default: 'red',
    hover: 'blue',
    focus: 'yellow',
  },
  // 2
  color: 'red',
  ':hover': {
    color: 'blue',
  },
  ':focus': {
    color: 'yellow',
  },
}}

const inputStyle = {
  borderWidth: [1,2,3],
  borderColor: {
    default: ['black', 'gray', 'orange'],
    ':hover': ['blue', 'red', 'yellow'],
    _focus: ['blue', 'red', 'yellow'],
  },
}

const outputStyle = {
  borderWidth: 1,
  borderColor: 'black',
  ':hover': {
    borderColor: 'blue',
  },
  selectors: {
    '&:focus, &[data-focus], &[data-state=focused]': {
      borderColor: 'blue'
    }
  },
  '@media': {
    '(min-width: 640px)': {
      borderWidth: 2,
      borderColor: 'gray',
      ':hover': {
        borderColor: 'red',
      },
      selectors: {
        '&:focus, &[data-focus], &[data-state=focused]': {
          borderColor: 'red'
        }
      },
    },
    '(min-width: 768px)': {
      borderWidth: 3,
      borderColor: 'orange',
      ':hover': {
        borderColor: 'yellow',
      }
      selectors: {
        '&:focus, &[data-focus], &[data-state=focused]': {
          borderColor: 'yellow'
        }
      },
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
