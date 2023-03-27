import {
  compareStrong,
  compareWeak,
  isEtagcFormat,
  isStrongETag,
  isWeakETag,
} from "./validate.ts";
import type { ETag } from "./types.ts";
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
      "",
    ];

    table.forEach((etag) => {
      assert(isEtagcFormat(etag));
    });
  });

  it("should return false", () => {
    const table: string[] = [
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

describe("isStrongETag", () => {
  it("should return true", () => {
    const table: ETag[] = [
      { tag: "", weak: false },
      { tag: "xxx", weak: false },
      { tag: "あ", weak: false },
    ];

    table.forEach((etag) => {
      assert(isStrongETag(etag));
    });
  });

  it("should return false", () => {
    const table: ETag[] = [
      { tag: "", weak: true },
      { tag: "xxx", weak: true },
      { tag: "あ", weak: true },
    ];

    table.forEach((etag) => {
      assert(!isStrongETag(etag));
    });
  });
});

describe("isWeakETag", () => {
  it("should return true", () => {
    const table: ETag[] = [
      { tag: "", weak: true },
      { tag: "xxx", weak: true },
      { tag: "あ", weak: true },
    ];

    table.forEach((etag) => {
      assert(isWeakETag(etag));
    });
  });

  it("should return false", () => {
    const table: ETag[] = [
      { tag: "", weak: false },
      { tag: "xxx", weak: false },
      { tag: "あ", weak: false },
    ];

    table.forEach((etag) => {
      assert(!isWeakETag(etag));
    });
  });
});

describe("compareStrong", () => {
  it("should return true", () => {
    const table: [ETag, ETag][] = [
      [{ tag: "", weak: false }, { tag: "", weak: false }],
      [{ tag: "あabcd", weak: false }, { tag: "あabcd", weak: false }],
    ];

    table.forEach(([left, right]) => {
      assert(compareStrong(left, right));
    });
  });

  it("should return false if the validator is not strong", () => {
    const table: [ETag, ETag][] = [
      [{ tag: "", weak: true }, { tag: "", weak: false }],
      [{ tag: "あabcd", weak: false }, { tag: "あabcd", weak: true }],
    ];

    table.forEach(([left, right]) => {
      assert(!compareStrong(left, right));
    });
  });

  it("should return false if the tag does is not same", () => {
    const table: [ETag, ETag][] = [
      [{ tag: "a", weak: false }, { tag: "", weak: false }],
      [{ tag: " あabcd", weak: false }, { tag: "あabcd", weak: false }],
    ];

    table.forEach(([left, right]) => {
      assert(!compareStrong(left, right));
    });
  });
});

describe("compareWeak", () => {
  it("should return true", () => {
    const table: [ETag, ETag][] = [
      [{ tag: "", weak: false }, { tag: "", weak: false }],
      [{ tag: "", weak: true }, { tag: "", weak: false }],
      [{ tag: "", weak: false }, { tag: "", weak: true }],
      [{ tag: "", weak: true }, { tag: "", weak: true }],
      [{ tag: "あabcd", weak: true }, { tag: "あabcd", weak: false }],
    ];

    table.forEach(([left, right]) => {
      assert(compareWeak(left, right));
    });
  });

  it("should return false if the tag does is not same", () => {
    const table: [ETag, ETag][] = [
      [{ tag: "a", weak: false }, { tag: "", weak: false }],
      [{ tag: " あabcd", weak: true }, { tag: "あabcd", weak: false }],
    ];

    table.forEach(([left, right]) => {
      assert(!compareWeak(left, right));
    });
  });
});
