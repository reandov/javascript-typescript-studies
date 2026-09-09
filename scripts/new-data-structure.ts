import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toPascalCase(slug: string): string {
  const name = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  return /^\d/.test(name) ? `DataStructure${name}` : name;
}

function toTitle(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function createDataStructure(): Promise<void> {
  const name = process.argv.slice(2).join(" ");
  const slug = slugify(name);

  if (!slug) {
    throw new Error(
      'Provide a data structure name, for example: npm run new-data-structure -- "Union Find"',
    );
  }

  const className = toPascalCase(slug);
  const title = toTitle(slug);
  const directory = path.join(process.cwd(), "data-structures", slug);
  const sourcePath = path.join(directory, `${slug}.ts`);
  const testPath = path.join(directory, `${slug}.test.ts`);
  const readmePath = path.join(directory, "README.md");

  await mkdir(directory, { recursive: false });

  const source = `/**
 * ${title}
 *
 * Purpose: TODO.
 *
 * Operations:
 * - TODO
 *
 * Time complexity: TODO.
 * Space complexity: TODO.
 */
export class ${className} {
  constructor() {
    throw new Error("Not implemented");
  }
}
`;

  const test = `import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { ${className} } from "./${slug}";

describe("${className}", () => {
  it("throws until test cases are written", () => {
    assert.throws(() => new ${className}(), /Not implemented/);
  });
});
`;

  const readme = `# ${title}

## Purpose

TODO: Explain what this structure stores and which operations it optimizes.

## Study Goal

TODO: Explain what this implementation is intended to teach from scratch.

## Operations

| Operation | Complexity | Notes |
| --- | --- | --- |
| TODO | TODO | TODO |

## Related Concepts And Problems

TODO: Link algorithms, concepts, and practice problems that use this structure.
`;

  await Promise.all([
    writeFile(sourcePath, source, { flag: "wx" }),
    writeFile(testPath, test, { flag: "wx" }),
    writeFile(readmePath, readme, { flag: "wx" }),
  ]);

  console.log(`Created data-structures/${slug}/`);
}

createDataStructure().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Could not create data structure: ${message}`);
  process.exitCode = 1;
});
