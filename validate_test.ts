import { isEtagcFormat } from "./validate.ts";
import { assert, describe, it } from "./_dev_deps.ts";

describe("isEtagcFormat", () => {
  it("should return true", () => {
    const table: string[] = [
      "a",
      "123",
      "ÿ",
      "ÿÿÿÿÿÿÿÿ",
      "!",
      "'",
      "abc",
    ];

    table.forEach((etag) => {
      assert(isEtagcFormat(etag));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
      " ",
      `"`,
      "あ",
      "亜",
    ];

    table.forEach((etag) => {
      assert(!isEtagcFormat(etag));
    });
  });
});
