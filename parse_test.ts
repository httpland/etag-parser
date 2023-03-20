import { parse } from "./parse.ts";
import { assertEquals, assertThrows, describe, it } from "./_dev_deps.ts";
import type { ETag } from "./types.ts";

describe("parse", () => {
  it("should return parsed etag", () => {
    const table: [string, ETag][] = [
      [`"abc"`, { tag: "abc", weak: false }],
      [`""`, { tag: "", weak: false }],
      [`W/""`, { tag: "", weak: true }],
      [`W/"abc"`, { tag: "abc", weak: true }],
      [`W/"10ab-="`, { tag: "10ab-=", weak: true }],
      [` W/"10ab-=" `, { tag: "10ab-=", weak: true }],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(parse(input), expected);
    });
  });

  it("should throw error", () => {
    const table: string[] = [
      "",
      "    ",
      "abc",
      `"""`,
      `"abc`,
      `abc"`,
      `W/abc`,
      `W/"abc`,
      `W/abc"`,
    ];

    table.forEach((input) => {
      assertThrows(() => parse(input));
    });
  });
});
