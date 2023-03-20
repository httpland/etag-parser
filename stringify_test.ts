import { stringify } from "./stringify.ts";
import { assertEquals, assertThrows, describe, it } from "./_dev_deps.ts";
import type { ETag } from "./types.ts";

describe("stringify", () => {
  it("should throw error if the etag is invalid", () => {
    const table: ETag[] = [{ tag: "", weak: true }, { tag: `""`, weak: false }];

    table.forEach((etag) => {
      assertThrows(() => stringify(etag));
    });
  });

  it("should return string", () => {
    const table: [ETag, string][] = [
      [{ tag: "abc", weak: true }, `W/"abc"`],
      [{ tag: "efg", weak: false }, `"efg"`],
    ];

    table.forEach(([etag, expected]) => {
      assertEquals(stringify(etag), expected);
    });
  });
});
