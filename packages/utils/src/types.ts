import * as React from 'react';
import { As, PropsWithAs, RenderProp } from 'reakit-utils/types';
import { LiteralUnion, ValueOf } from 'type-fest';

export type Empty = undefined | null | false;

export type Dict<T = any> = Record<string, T>;

export type FirstParameter<F> = F extends (arg: infer T) => any ? T : never;

export type ParameterTypes<F> = F extends (...args: infer A) => any ? A : never;

export type UnionStringArray<T extends Readonly<string[]>> = T[number];

export type PropsOf<T extends As> = React.ComponentPropsWithRef<T>;

export type ResponsiveStyleValue<T> = T | Empty | Array<T | Empty>;

export type { As, LiteralUnion, ValueOf, PropsWithAs, RenderProp };
