// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { isString } from "./deps.ts";
import { Msg } from "./constants.ts";
import { quoted, sentence } from "./utils.ts";
import type { ETag } from "./types.ts";

/**
 * @see https://www.rfc-editor.org/rfc/rfc9110#section-8.8.3-2
 */
const ReETag = /^(?<weak>W\/)?"(?<etagc>[\x21\x23-\x7E\x80-\xFF]*)"$/;

/** Parses string into {@link ETag}.
 * @param input Any string
 *
 * @example
 * ```ts
 * import { parseETag } from "https://deno.land/x/etag_parser@$VERSION/parse.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(parseETag(`W/"123456789"`), { tag: "123456789", weak: true });
 * assertEquals(parseETag(`"123456789"`), { tag: "123456789", weak: false });
 * ```
 *
 * @throws {SyntaxError} If the input is invalid [`<entity-tag>`](https://www.rfc-editor.org/rfc/rfc9110#section-8.8.3-2).
 */
export function parseETag(input: string): ETag {
  input = input.trim();

  const result = ReETag.exec(input);

  if (!result || !result.groups || !isString(result.groups.etagc)) {
    const message = sentence(Msg.InvalidETag, quoted(input));

    throw SyntaxError(message);
  }

  const weak = !!result.groups.weak;

  return { weak, tag: result.groups.etagc };
}

/**
 * @deprecated Rename to {@link parseETag}.
 */
export const parse = parseETag;
