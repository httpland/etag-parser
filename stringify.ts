// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { quoted, weakPrefix } from "./utils.ts";
import { assertEtagcFormat } from "./validate.ts";
import type { ETag, ETagFormat } from "./types.ts";

/** Serialize {@link ETag} into string.
 *
 * @example
 * ```ts
 * import { stringify } from "https://deno.land/x/etag_parser@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(stringify({ weak: true, tag: "123456789" }), `W/"123456789"`);
 * assertEquals(stringify({ weak: false, tag: "123456789" }), `"123456789"`);
 * ```
 *
 * @throws {TypeError} If the {@link ETag.tag} is not [`<etagc>`](https://www.rfc-editor.org/rfc/rfc9110#field.etag) format.
 */
export function stringify(etag: ETag): ETagFormat {
  assertEtagcFormat(etag.tag, Msg.InvalidEtagc);

  const opaqueTag = quoted(etag.tag);
  const etagFormat = etag.weak ? weakPrefix(opaqueTag) : opaqueTag;

  return etagFormat;
}

const enum Msg {
  InvalidEtagc = "tag is not <etagc> format.",
}
