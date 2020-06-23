import * as React from 'react';
import { As } from 'reakit-utils';
import { LiteralUnion, ValueOf } from 'type-fest';

export type Dict<T = any> = Record<string, T>;

export type FirstParameters<T> = T extends (arg: infer T) => any ? T : never;

export type UnionStringArray<T extends Readonly<string[]>> = T[number];

export type PropsOf<T extends As> = React.ComponentPropsWithRef<T>;

export type { As, LiteralUnion, ValueOf };
