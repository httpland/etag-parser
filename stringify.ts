// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { quoted, sentence, weakPrefix } from "./utils.ts";
import { assertEtagcFormat } from "./validate.ts";
import { Msg } from "./constants.ts";
import type { ETag, ETagFormat } from "./types.ts";

/** Serialize {@link ETag} into string.
 *
 * @example
 * ```ts
 * import { stringifyETag } from "https://deno.land/x/etag_parser@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(stringifyETag({ weak: true, tag: "123456789" }), `W/"123456789"`);
 * assertEquals(stringifyETag({ weak: false, tag: "123456789" }), `"123456789"`);
 * ```
 *
 * @throws {TypeError} If the {@link ETag.tag} is not [`<etagc>`](https://www.rfc-editor.org/rfc/rfc9110#field.etag) format.
 */
export function stringifyETag(etag: ETag): ETagFormat {
  const { tag, weak } = etag;
  const message = sentence(Msg.InvalidEtagc, quoted(tag));

  assertEtagcFormat(tag, message);

  const opaqueTag = quoted(tag);
  const etagFormat = weak ? weakPrefix(opaqueTag) : opaqueTag;

  return etagFormat;
}

/**
 * @deprecated Rename to {@link stringifyETag}.
 */
export const stringify = stringifyETag;
