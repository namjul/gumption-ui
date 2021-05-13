import { toArray, RenderProp, isObject } from 'reakit-utils';
import merge from 'deepmerge';
import mergeProps from 'merge-props';
import { Dict, UnionStringArray } from './types';

export * from './types';

export const objectKeys = <T extends Dict>(obj: T): (keyof T)[] =>
  (Object.keys(obj) as unknown) as (keyof T)[];

/**
 * Get value from a deeply nested object using a string path
 * @param obj - the object
 * @param path - the string path
 * @param def  - the fallback value
 */
export function get(
  obj: any,
  path: string | number,
  fallback?: any,
  index?: number,
): any {
  /* eslint-disable no-param-reassign, no-plusplus */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  path = (path?.split?.('.') ?? [path]) as string;
  for (index = 0; index < path.length; index++) {
    obj = obj ? obj[path[index]] : undefined;
  }
  return obj === undefined ? fallback : obj;
  /* eslint-enable no-param-reassign, no-plusplus */
}

export function isRenderProp(children: any): children is RenderProp {
  return typeof children === 'function';
}

export { merge, toArray, mergeProps, isObject };

// Assertions

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function isEmptyObject(value: unknown): value is Dict {
  return isObject(value) && Object.keys(value).length === 0;
}

export function isString(value: unknown): value is string {
  return Object.prototype.toString.call(value) === '[object String]';
}

export const domElements = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'b',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'button',
  'caption',
  'cite',
  'circle',
  'code',
  'col',
  'dd',
  'del',
  'details',
  'dfn',
  'div',
  'dl',
  'dt',
  'em',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'i',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'main',
  'mark',
  'nav',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'path',
  'picture',
  'pre',
  'q',
  'rect',
  's',
  'svg',
  'section',
  'select',
  'small',
  'span',
  'strong',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'tr',
  'u',
  'ul',
  'video',
] as const;

export type DOMElements = UnionStringArray<typeof domElements>;

export function runIfFn<T, U>(
  valueOrFn: T | ((..._args: U[]) => T),
  ...args: U[]
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}
