// import * as React from 'react';
import { kwark as rawKwark, Component, KwarkConfig } from '@gumption-ui/kwark';
import { As, DOMElements, domElements } from '@gumption-ui/utils';
import { jsx } from './jsx';
import { CssProp, StyleProps } from './types';

type StyledOptions = CssProp & StyleProps;

type StyledConfig<T, O> = Exclude<KwarkConfig<T, O>, 'useCreateElement'>;

function styled<T extends As, O extends StyledOptions>(
  component: T,
  config: StyledConfig<T, O> = {},
): Component<T, O> {
  return rawKwark(component, {
    useCreateElement: jsx,
    ...config,
  });
}

type KwarkJSXElements = {
  [Tag in DOMElements]: Component<Tag, unknown>;
};

export const kwark = (styled as unknown) as typeof styled & KwarkJSXElements;

domElements.forEach((tag) => {
  kwark[tag] = kwark(tag);
});
