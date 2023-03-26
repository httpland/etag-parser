import { stringify } from "./stringify.ts";
import {
  assertEquals,
  assertIsError,
  assertThrows,
  describe,
  it,
} from "./_dev_deps.ts";
import type { ETag } from "./types.ts";

describe("stringify", () => {
  it("should throw error if the etag is invalid", () => {
    const table: ETag[] = [
      { tag: `"`, weak: false },
      { tag: ` `, weak: false },
      { tag: ` a`, weak: false },
      { tag: `a `, weak: false },
    ];

    table.forEach((etag) => {
      assertThrows(() => stringify(etag));
    });
  });

  it("should return string", () => {
    const table: [ETag, string][] = [
      [{ tag: "abc", weak: true }, `W/"abc"`],
      [{ tag: "efg", weak: false }, `"efg"`],
      [{ tag: "", weak: true }, `W/""`],
      [{ tag: "", weak: false }, `""`],
    ];

    table.forEach(([etag, expected]) => {
      assertEquals(stringify(etag), expected);
    });
  });

  it("should be error message", () => {
    let err;

    try {
      stringify({ tag: "あ", weak: false });
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, TypeError, `invalid <etagc> syntax. "あ"`);
    }
  });
});
