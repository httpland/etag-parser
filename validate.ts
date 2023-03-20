// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

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
