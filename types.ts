// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** HTTP `ETag` header filed. */
export interface ETag {
  /** Representation of [`<etagc>`](https://www.rfc-editor.org/rfc/rfc9110.html#section-8.8.3-2). */
  readonly tag: string;

  /** Whether this is weak validator or not. */
  readonly weak: boolean;
}

/** Representation of [`<entity-tag>`](https://www.rfc-editor.org/rfc/rfc9110#section-8.8.3-2) */
export type ETagFormat = OpaqueTagFormat | WeakETagFormat;

/** Representation of weak ETag. */
export type WeakETagFormat = `W/${OpaqueTagFormat}`;

/** Representation of [`<opaque-tag>`](https://www.rfc-editor.org/rfc/rfc9110#section-8.8.3-2). */
export type OpaqueTagFormat = `"${string}"`;

/** {@link ETag} with strong validator. */
export interface StrongETag extends ETag {
  readonly weak: false;
}

/** {@link ETag} with weak validator. */
export interface WeakETag extends ETag {
  readonly weak: true;
}
