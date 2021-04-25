// const useStyleConfig = createHook<Config, RoleHTMLProps>({
//   keys: ['variant', 'size', 'themeKey'],
//   useProps: (options, { css, ...htmlProps }) => {
//     const theme = useTheme();
//     const optionsWithTheme = { ...options, theme };
//     const computedStyles: ThemedStyle = {
//       ...baseStyles(optionsWithTheme),
//       ...modifierStyle(optionsWithTheme),
//       ...useSlotStyles(name),
//       ...css,
//     };
//
//     return {
//       ...htmlProps,
//       css: computedStyles,
//     };
//   },
// });
