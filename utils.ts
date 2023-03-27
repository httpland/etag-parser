// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** Return quoted string. */
export function quoted<T extends string>(input: T): `"${T}"` {
  return `"${input}"`;
}

/** Return weak prefixed string. */
export function weakPrefix<T extends string>(input: T): `W/${T}` {
  return `W/${input}`;
}

/** Create new sentence. */
export function sentence(...sentences: readonly string[]): string {
  return sentences.join(" ");
}
