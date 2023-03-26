// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

export { parse, parseETag } from "./parse.ts";
export { stringify, stringifyETag } from "./stringify.ts";
export type {
  ETag,
  ETagFormat,
  OpaqueTagFormat,
  WeakETagFormat,
} from "./types.ts";
