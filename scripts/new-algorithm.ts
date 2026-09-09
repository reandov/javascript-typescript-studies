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

function toCamelCase(slug: string): string {
  const name = slug.replace(/-([a-z0-9])/g, (_, char: string) => char.toUpperCase());

  return /^\d/.test(name) ? `algorithm${name}` : name;
}

function toTitle(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function createAlgorithm(): Promise<void> {
  const name = process.argv.slice(2).join(" ");
  const slug = slugify(name);

  if (!slug) {
    throw new Error(
      'Provide an algorithm name, for example: npm run new-algorithm -- "Binary Search Lower Bound"',
    );
  }

  const functionName = toCamelCase(slug);
  const title = toTitle(slug);
  const directory = path.join(process.cwd(), "algorithms", slug);
  const sourcePath = path.join(directory, `${slug}.ts`);
  const testPath = path.join(directory, `${slug}.test.ts`);
  const readmePath = path.join(directory, "README.md");

  await mkdir(directory, { recursive: false });

  const source = `/**
 * ${title}
 *
 * Purpose: TODO.
 *
 * Approach: TODO.
 * Time complexity: TODO.
 * Space complexity: TODO.
 */
export function ${functionName}(): unknown {
  throw new Error("Not implemented");
}
`;

  const test = `import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { ${functionName} } from "./${slug}";

describe("${functionName}", () => {
  it("throws until test cases are written", () => {
    assert.throws(() => ${functionName}(), /Not implemented/);
  });
});
`;

  const readme = `# ${title}

## Purpose

TODO: Explain what this algorithm computes and when to use it.

## Study Goal

TODO: Explain what this implementation is intended to teach from scratch.

## Invariants

TODO: Capture the key invariant or proof idea.

## Complexity

- Time: TODO
- Space: TODO

## Related Concepts And Problems

TODO: Link concepts, data structures, and practice problems that use this idea.
`;

  await Promise.all([
    writeFile(sourcePath, source, { flag: "wx" }),
    writeFile(testPath, test, { flag: "wx" }),
    writeFile(readmePath, readme, { flag: "wx" }),
  ]);

  console.log(`Created algorithms/${slug}/`);
}

createAlgorithm().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Could not create algorithm: ${message}`);
  process.exitCode = 1;
});
