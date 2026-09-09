import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const CUSTOM_PROBLEM_ROOT = path.join("problems", "custom");

type ParsedArgs = {
  title: string;
  prompt?: string;
  promptFile?: string;
};

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

  return /^\d/.test(name) ? `customProblem${name}` : name;
}

function escapeMarkdownCell(value: string): string {
  return value.replaceAll("|", "\\|");
}

function parseArgs(args: string[]): ParsedArgs {
  const titleParts: string[] = [];
  let prompt: string | undefined;
  let promptFile: string | undefined;

  for (let index = 0; index < args.length; index++) {
    const arg = args[index];

    if (arg === "--prompt") {
      prompt = args[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--prompt-file") {
      promptFile = args[index + 1];
      index += 1;
      continue;
    }

    titleParts.push(arg);
  }

  const title = titleParts.join(" ").trim();

  if (!title) {
    throw new Error(
      'Provide a custom problem title, for example: npm run new-custom-problem -- "Rate Limiter"',
    );
  }

  if (prompt !== undefined && promptFile !== undefined) {
    throw new Error("Use either --prompt or --prompt-file, not both.");
  }

  return { title, prompt, promptFile };
}

function createPrompt(title: string, prompt?: string): string {
  if (prompt !== undefined && prompt.trim()) {
    return `${prompt.trim()}\n`;
  }

  return `# ${title}

## Prompt

TODO: Describe the custom interview question.

## Function Signature

TODO: Define the expected exported function signature.

## Examples

TODO: Add input and output examples.

## Constraints

TODO: Add input size limits, value ranges, and edge-case guarantees.
`;
}

async function updateCustomIndex(title: string, slug: string): Promise<void> {
  const indexPath = path.join(process.cwd(), CUSTOM_PROBLEM_ROOT, "README.md");
  const row = `| ${escapeMarkdownCell(title)} | [prompt](${slug}/prompt.md) | [source](${slug}/${slug}.ts) |`;

  let rows: string[] = [];

  try {
    const current = await readFile(indexPath, "utf8");
    rows = current
      .split(/\r?\n/)
      .filter(
        (line) =>
          line.startsWith("| ") && !line.startsWith("| Problem ") && !line.startsWith("| --- "),
      );
  } catch (error: unknown) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code !== "ENOENT") throw error;
  }

  if (rows.some((existingRow) => existingRow.includes(`](${slug}/`))) {
    throw new Error(`Custom problem ${slug} is already present in the index.`);
  }

  rows.push(row);
  rows.sort((left, right) =>
    left.localeCompare(right, undefined, {
      sensitivity: "base",
    }),
  );

  const index = `# Custom Problems

Custom interview questions live here separately from LeetCode problems. Each
problem keeps its prompt, solution, and tests in one directory.

| Problem | Prompt | Solution |
| --- | --- | --- |
${rows.join("\n")}
`;

  await writeFile(indexPath, index);
}

async function createCustomProblem(): Promise<void> {
  const { title, prompt, promptFile } = parseArgs(process.argv.slice(2));
  const slug = slugify(title);

  if (!slug) {
    throw new Error("The custom problem title must include letters or numbers.");
  }

  const functionName = toCamelCase(slug);
  const customRoot = path.join(process.cwd(), CUSTOM_PROBLEM_ROOT);
  const problemDirectory = path.join(customRoot, slug);
  const sourcePath = path.join(problemDirectory, `${slug}.ts`);
  const testPath = path.join(problemDirectory, `${slug}.test.ts`);
  const promptPath = path.join(problemDirectory, "prompt.md");

  const promptText =
    promptFile === undefined
      ? prompt
      : await readFile(path.resolve(process.cwd(), promptFile), "utf8");

  await mkdir(customRoot, { recursive: true });
  await mkdir(problemDirectory);

  const source = `/**
 * ${title}
 *
 * Description: See prompt.md.
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
  it("throws until custom tests are generated", () => {
    assert.throws(() => ${functionName}(), /Not implemented/);
  });
});
`;

  await Promise.all([
    writeFile(sourcePath, source, { flag: "wx" }),
    writeFile(testPath, test, { flag: "wx" }),
    writeFile(promptPath, createPrompt(title, promptText), { flag: "wx" }),
  ]);

  await updateCustomIndex(title, slug);

  console.log(`Created ${CUSTOM_PROBLEM_ROOT}/${slug}/`);
  console.log(`  ${slug}.ts`);
  console.log(`  ${slug}.test.ts`);
  console.log("  prompt.md");
  console.log(`Updated ${CUSTOM_PROBLEM_ROOT}/README.md`);
}

createCustomProblem().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Could not create custom problem: ${message}`);
  process.exitCode = 1;
});
