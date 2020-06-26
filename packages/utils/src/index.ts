import { toArray } from 'reakit-utils';
import merge from 'deepmerge';
import mergeProps from 'merge-props';
import { Dict } from './types';

export * from './types';

export const objectKeys = <T extends Dict>(obj: T) =>
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
) {
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

export { merge, toArray, mergeProps };

// Assertions

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function isObject(value: unknown): value is Dict {
  return typeof value === 'object';
}

export function isEmptyObject(value: unknown) {
  return isObject(value) && Object.keys(value).length === 0;
}

export function isString(value: unknown): value is string {
  return Object.prototype.toString.call(value) === '[object String]';
}
