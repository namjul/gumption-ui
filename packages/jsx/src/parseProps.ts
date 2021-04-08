import { As } from '@gumption-ui/utils';

type ParsePropsReturnType<T> = Record<string, any> & {
  typePropName: T;
};

export function parseProps<T extends As>(
  type: T,
  props?: Record<string, any> | null,
): ParsePropsReturnType<T> | null {
  let next: Record<string, any> = {
    typePropName: type,
  };

  if (!props) {
    return (next as unknown) as ParsePropsReturnType<T>;
  }

  const { css, variant, size, component, slots, ...restProps } = props;

  next = {
    ...next,
    ...restProps,
  };

  // Fix for React.Fragment.
  if (typeof type === 'symbol') {
    return null;
  }

  if (!variant && !size && !slots) {
    next.css = css;
    return (next as unknown) as ParsePropsReturnType<T>;
  }

  next.css = css;
  // next.css = (theme) => {};

  return (next as unknown) as ParsePropsReturnType<T>;
}
