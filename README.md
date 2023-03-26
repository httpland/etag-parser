# etag-parser

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/etag_parser)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/etag_parser/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/httpland/etag-parser)](https://github.com/httpland/etag-parser/releases)
[![codecov](https://codecov.io/gh/httpland/etag-parser/branch/main/graph/badge.svg)](https://codecov.io/gh/httpland/etag-parser)
[![GitHub](https://img.shields.io/github/license/httpland/etag-parser)](https://github.com/httpland/etag-parser/blob/main/LICENSE)

[![test](https://github.com/httpland/etag-parser/actions/workflows/test.yaml/badge.svg)](https://github.com/httpland/etag-parser/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@httpland/etag-parser.png?mini=true)](https://nodei.co/npm/@httpland/etag-parser/)

HTTP ETag header field parser.

Compliant with
[RFC 9110, 8.8.3. ETag](https://www.rfc-editor.org/rfc/rfc9110#section-8.8.3).

## Deserialization

Parses string into [ETag](#etag).

```ts
import { parseETag } from "https://deno.land/x/etag_parser@$VERSION/parse.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

assertEquals(parseETag(`W/"123456789"`), { tag: "123456789", weak: true });
assertEquals(parseETag(`"123456789"`), { tag: "123456789", weak: false });
```

### Throwing error

Throws `SyntaxError` if the input is invalid
[`<entity-tag>`](https://www.rfc-editor.org/rfc/rfc9110#section-8.8.3-2).

```ts
import { parseETag } from "https://deno.land/x/etag_parser@$VERSION/parse.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

assertThrows(() => parseETag("<invalid>"));
```

## Serialization

Serialize [ETag](#etag) into string.

```ts
import { stringifyETag } from "https://deno.land/x/etag_parser@$VERSION/stringify.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

assertEquals(stringifyETag({ weak: true, tag: "123456789" }), `W/"123456789"`);
assertEquals(stringifyETag({ weak: false, tag: "123456789" }), `"123456789"`);
```

### Throwing error

Throws `TypeError` if [ETag](#etag) contains invalid value.

```ts
import { stringifyETag } from "https://deno.land/x/etag_parser@$VERSION/stringify.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

assertThrows(() => stringifyETag({ tag: "aあ亜", weak: true }));
```

## ETag

ETag is a structured object for `ETag` header.

| Name | Type      | Description                                                                                 |
| ---- | --------- | ------------------------------------------------------------------------------------------- |
| tag  | `string`  | Representation of [`<etagc>`](https://www.rfc-editor.org/rfc/rfc9110.html#section-8.8.3-2). |
| weak | `boolean` | Whether this is weak validator or not.                                                      |

## Utilities

### compareWeak

Weak comparison. Two `ETag` are equivalent if `ETag.tag` match
character-by-character, regardless of either or both being tagged as
`ETag.weak`.

Compliant with
[RFC 9110, 8.8.3.2. Comparison](https://www.rfc-editor.org/rfc/rfc9110.html#name-comparison-2).

```ts
import { compareWeak } from "https://deno.land/x/etag_parser@$VERSION/validate.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(
  compareWeak(
    { weak: true, tag: "123456789" },
    { weak: false, tag: "123456789" },
  ),
);
```

### compareStrong

Strong comparison. Two `ETag` are equivalent if both are `StrongETag` and
`ETag.tag` match character-by-character.

Compliant with
[RFC 9110, 8.8.3.2. Comparison](https://www.rfc-editor.org/rfc/rfc9110.html#name-comparison-2).

```ts
import { compareWeak } from "https://deno.land/x/etag_parser@$VERSION/validate.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(
  compareWeak(
    { weak: false, tag: "123456789" },
    { weak: false, tag: "123456789" },
  ),
);
```

### isWeakETag

Whether the `ETag` is `WeakETag` or not.

```ts
import { isWeakETag } from "https://deno.land/x/etag_parser@$VERSION/validate.ts";
import { assert, assertFalse } from "https://deno.land/std/testing/asserts.ts";

assert(isWeakETag({ weak: true, tag: "123456789" }));
assertFalse(isWeakETag({ weak: false, tag: "123456789" }));
```

### isStrongETag

Whether the `ETag` is `StrongETag` or not.

```ts
import { isStrongETag } from "https://deno.land/x/etag_parser@$VERSION/validate.ts";
import { assert, assertFalse } from "https://deno.land/std/testing/asserts.ts";

assert(isStrongETag({ weak: false, tag: "123456789" }));
assertFalse(isStrongETag({ weak: true, tag: "123456789" }));
```

## API

All APIs can be found in the
[deno doc](https://doc.deno.land/https/deno.land/x/etag_parser/mod.ts).

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
