import { css } from 'otion';

export function useStyling(): { css: typeof css } {
  return {
    css,
  };
}
