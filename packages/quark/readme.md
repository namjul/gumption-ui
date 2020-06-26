# Theme concepts

## Ideas

## Options and HtmlProps

Similar to [reshadow](https://reshadow.dev/concepts) modifier and props.

## Overrides/Slots

- https://github.com/adobe-private/react-spectrum-v3/blob/master/packages/@react-spectrum/utils/src/Slots.tsx
- https://baseweb.design/guides/understanding-overrides/
- https://adamwathan.me/renderless-components-in-vuejs/

```tsx
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

```tsx
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

```tsx
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

```tsx

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
- https://github.com/chakra-ui/chakra-ui
- https://joshwcomeau.com/gatsby/dark-mode/
- https://github.com/kripod/react-polymorphic-box
- https://github.com/reakit/reakit
