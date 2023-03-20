// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** Return quoted string. */
export function quoted<T extends string>(input: T): `"${T}"`;
export function quoted(input: string): string;
export function quoted(input: string): string {
  return `"${input}"`;
}

/** Return weak prefixed string. */
export function weakPrefix<T extends string>(input: T): `W/${T}`;
export function weakPrefix(input: string): `W/${string}`;
export function weakPrefix(input: string): `W/${string}` {
  return `W/${input}`;
}
