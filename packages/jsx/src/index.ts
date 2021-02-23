import * as React from 'react';
import { As } from '@gumption-ui/utils';

export const jsx = <T extends As>(
  type: T,
  props: Record<string, any>,
  ...children: React.ReactNode[]
): JSX.Element => React.createElement(type, props, ...children);

// export const Fragment = React.Fragment;
