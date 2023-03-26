import { quoted, sentence, weakPrefix } from "./utils.ts";
import { assertEquals, describe, it } from "./_dev_deps.ts";

describe("weakPrefix", () => {
  it("should return string", () => {
    assertEquals(weakPrefix(""), "W/");
    assertEquals(weakPrefix("a"), "W/a");
  });
});

describe("quoted", () => {
  it("should return quoted string", () => {
    assertEquals(quoted(""), `""`);
    assertEquals(quoted("a"), `"a"`);
  });
});

describe("sentence", () => {
  it("should return sentence", () => {
    assertEquals(sentence("abc", "def"), "abc def");
  });
});
