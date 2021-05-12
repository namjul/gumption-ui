import { Fragment, createElement } from 'react';
import { As } from '@gumption-ui/utils';
import {
  parseProps as integralParseProps,
  Gumption,
  hasGumptionProps,
} from '@gumption-ui/integral';
import { parseProps } from './parseProps';
import { CssProp } from './types';
import type { GumptionOtionJSX } from './jsx-namespace';

export type { GumptionOtionJSX as JSX, CssProp };
export { Fragment };

export function jsx<T extends As>(
  type: T,
  props: Record<string, any>,
  ...children: React.ReactNode[]
): JSX.Element {
  const nextProps = integralParseProps(type, parseProps(type, props));
  return createElement(
    hasGumptionProps(nextProps) ? Gumption : type,
    nextProps,
    children,
  );
}
