import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const LEETCODE_PROBLEM_ROOT = path.join("problems", "leetcode");

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

  return /^\d/.test(name) ? `problem${name}` : name;
}

function toTitle(slug: string): string {
  return slug.replaceAll("-", " ").toUpperCase();
}

async function createProblem(): Promise<void> {
  const problemName = process.argv.slice(2).join(" ");
  const slug = slugify(problemName);

  if (!slug) {
    throw new Error('Provide a problem name, for example: npm run new-problem "Two Sum"');
  }

  const functionName = toCamelCase(slug);
  const problemDirectory = path.join(process.cwd(), LEETCODE_PROBLEM_ROOT, slug);
  const sourcePath = path.join(problemDirectory, `${slug}.ts`);
  const testPath = path.join(problemDirectory, `${slug}.test.ts`);

  await mkdir(path.dirname(problemDirectory), { recursive: true });
  await mkdir(problemDirectory);

  const source = `/**
 * ${toTitle(slug)}
 *
 * Description: TODO.
 *
 * Solution: TODO.
 */
export function ${functionName}(): void {
  // TODO: Implement the solution.
}
`;

  const test = `import { describe, it } from "node:test";

import { ${functionName} } from "./${slug}";

describe("${functionName}", () => {
  it.todo("add test cases");
});
`;

  await Promise.all([
    writeFile(sourcePath, source, { flag: "wx" }),
    writeFile(testPath, test, { flag: "wx" }),
  ]);

  console.log(`Created ${LEETCODE_PROBLEM_ROOT}/${slug}/`);
  console.log(`  ${slug}.ts`);
  console.log(`  ${slug}.test.ts`);
}

createProblem().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Could not create problem: ${message}`);
  process.exitCode = 1;
});
