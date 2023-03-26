// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import type { ETag, StrongETag, WeakETag } from "./types.ts";

/**
 * @see https://www.rfc-editor.org/rfc/rfc9110#field.etag
 */
const ReEtagc = /^[\x21\x23-\x7E\x80-\xFF]*$/;

/** Whether the input is [`<etagc>`](https://www.rfc-editor.org/rfc/rfc9110#field.etag) format or not.
 *
 * @param input Any string
 */
export function isEtagcFormat(input: string): boolean {
  return ReEtagc.test(input);
}

/** Assert for [`<etagc>`](https://www.rfc-editor.org/rfc/rfc9110#field.etag) format.
 *
 * @throws {TypeError} If the input is not [`<etagc>`](https://www.rfc-editor.org/rfc/rfc9110#field.etag) format.
 */
export function assertEtagcFormat(
  input: string,
  msg?: string,
): asserts input {
  if (!isEtagcFormat(input)) {
    throw TypeError(msg);
  }
}

/** Weak comparison.
 * Two {@link ETag} are equivalent if {@link ETag.tag} match character-by-character, regardless of either or both being tagged as {@link ETag.weak}.
 * Compliant with [RFC 9110, 8.8.3.2. Comparison](https://www.rfc-editor.org/rfc/rfc9110.html#name-comparison-2).
 *
 * @example
 * ```ts
 * import { compareWeak } from "https://deno.land/x/etag_parser@$VERSION/validate.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(
 *   compareWeak(
 *     { weak: true, tag: "123456789" },
 *     { weak: false, tag: "123456789" },
 *   ),
 * );
 * ```
 */
export function compareWeak(left: ETag, right: ETag): boolean {
  return left.tag === right.tag;
}

/** Strong comparison.
 * Two {@link ETag} are equivalent if both are {@link StrongETag} and {@link ETag.tag} match character-by-character.
 * Compliant with [RFC 9110, 8.8.3.2. Comparison](https://www.rfc-editor.org/rfc/rfc9110.html#name-comparison-2).
 *
 * @example
 * ```ts
 * import { compareWeak } from "https://deno.land/x/etag_parser@$VERSION/validate.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(
 *   compareWeak(
 *     { weak: false, tag: "123456789" },
 *     { weak: false, tag: "123456789" },
 *   ),
 * );
 * ```
 */
export function compareStrong(left: ETag, right: ETag): boolean {
  return isStrongETag(left) && isStrongETag(right) && left.tag === right.tag;
}

/** Whether the {@link ETag} is {@link WeakETag} or not.
 *
 * @example
 * ```ts
 * import { isWeakETag } from "https://deno.land/x/etag_parser@$VERSION/validate.ts";
 * import { assert, assertFalse } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(isWeakETag({ weak: true, tag: "123456789" }));
 * assertFalse(isWeakETag({ weak: false, tag: "123456789" }));
 * ```
 */
export function isWeakETag(etag: ETag): etag is WeakETag {
  return etag.weak;
}

/** Whether the {@link ETag} is {@link StrongETag} or not.
 *
 * @example
 * ```ts
 * import { isStrongETag } from "https://deno.land/x/etag_parser@$VERSION/validate.ts";
 * import { assert, assertFalse } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(isStrongETag({ weak: false, tag: "123456789" }));
 * assertFalse(isStrongETag({ weak: true, tag: "123456789" }));
 * ```
 */
export function isStrongETag(etag: ETag): etag is StrongETag {
  return !etag.weak;
}
