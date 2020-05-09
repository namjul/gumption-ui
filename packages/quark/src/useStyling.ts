import { css, CSSInterpolation } from '@emotion/css';

export function useStyling() {
  return (styles: CSSInterpolation): string => css(styles);
}
