import { BuildOptions } from "https://deno.land/x/dnt@0.33.1/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  typeCheck: true,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@httpland/etag-parser",
    version,
    description: "HTTP ETag header field parser",
    keywords: [
      "http",
      "header",
      "etag",
      "parser",
      "parse",
      "deserialize",
      "stringify",
      "serialize",
      "weak",
      "entity-tag",
    ],
    license: "MIT",
    homepage: "https://github.com/httpland/etag-parser",
    repository: {
      type: "git",
      url: "git+https://github.com/httpland/etag-parser.git",
    },
    bugs: {
      url: "https://github.com/httpland/etag-parser/issues",
    },
    sideEffects: false,
    type: "module",
    publishConfig: {
      access: "public",
    },
  },
  packageManager: "pnpm",
  mappings: {
    "https://deno.land/x/isx@1.0.0-beta.24/mod.ts": {
      name: "isxx",
      version: "1.0.0-beta.24",
    },
  },
});
