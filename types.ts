// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** HTTP `ETag` header filed. */
export interface ETag {
  /** Representation of [`<etagc>`](https://www.rfc-editor.org/rfc/rfc9110.html#section-8.8.3-2). */
  readonly tag: string;

  /** Whether this is weak validator or not. */
  readonly weak: boolean;
}

export type ETagFormat = OpaqueTagFormat | WeakETagFormat;

export type WeakETagFormat = `W/${OpaqueTagFormat}`;

export type OpaqueTagFormat = `"${string}"`;
