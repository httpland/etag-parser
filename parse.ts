// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { isString } from "./deps.ts";
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
 * import { parse } from "https://deno.land/x/etag_parser@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(parse(`W/"123456789"`), { tag: "123456789", weak: true });
 * assertEquals(parse(`"123456789"`), { tag: "123456789", weak: false });
 * ```
 *
 * @throws {SyntaxError} If the input is invalid [`<entity-tag>`](https://www.rfc-editor.org/rfc/rfc9110#section-8.8.3-2).
 */
export function parse(input: string): ETag {
  input = input.trim();

  const result = ReETag.exec(input);

  if (!result || !result.groups || !isString(result.groups.etagc)) {
    throw SyntaxError("invalid <entity-tag> format.");
  }

  const weak = !!result.groups.weak;

  return { weak, tag: result.groups.etagc };
}
