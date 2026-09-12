import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import TurndownService from "turndown";

type CodeSnippet = {
  langSlug: string;
  code: string;
};

type QuestionResponse = {
  data?: {
    question?: {
      questionId: string;
      questionFrontendId: string;
      title: string;
      titleSlug: string;
      content: string | null;
      exampleTestcases: string;
      codeSnippets: CodeSnippet[];
    } | null;
  };
  errors?: Array<{ message: string }>;
};

export type LeetcodeQuestion = {
  questionId: string;
  frontendId: string;
  title: string;
  slug: string;
  canonicalUrl: string;
  typescriptStarter: string;
  exampleTestcases: string;
  content: string;
};

function getSlug(input: string): string {
  input = input.trim();
  if (/^[a-z][a-z0-9+.-]*:/i.test(input)) {
    const url = new URL(input);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    const match = url.pathname.match(/^\/problems\/([a-z0-9]+(?:-[a-z0-9]+)*)(?:\/|$)/);

    if (url.protocol !== "https:" || host !== "leetcode.com" || !match) {
      throw new Error("Expected an HTTPS LeetCode problem URL.");
    }

    return match[1];
  }

  const slug = input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!slug) throw new Error("Provide a LeetCode problem URL, slug, or title.");

  return slug;
}

export async function fetchLeetcodeQuestion(
  input: string,
  fetcher: typeof fetch = fetch,
): Promise<LeetcodeQuestion> {
  const requestedSlug = getSlug(input);
  const response = await fetcher("https://leetcode.com/graphql/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    signal: AbortSignal.timeout(30_000),
    body: JSON.stringify({
      query: `query questionEditorData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionId
          questionFrontendId
          title
          titleSlug
          content
          exampleTestcases
          codeSnippets { langSlug code }
        }
      }`,
      variables: { titleSlug: requestedSlug },
    }),
  });

  if (!response.ok) {
    throw new Error(`LeetCode metadata request failed: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as QuestionResponse;

  if (payload.errors?.length) {
    throw new Error(
      `LeetCode metadata request failed: ${payload.errors.map((error) => error.message).join("; ")}`,
    );
  }

  const question = payload.data?.question;

  if (!question) throw new Error(`LeetCode problem not found: ${requestedSlug}`);

  if (
    !/^\d+$/.test(question.questionFrontendId) ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(question.titleSlug)
  ) {
    throw new Error("LeetCode returned an invalid problem number or slug.");
  }

  if (!question.content?.trim()) {
    throw new Error(`No official statement is available for: ${question.titleSlug}`);
  }

  const typescriptSnippet = question.codeSnippets.find(
    (snippet) => snippet.langSlug === "typescript",
  );

  if (!typescriptSnippet) {
    throw new Error(`No TypeScript starter exists for: ${question.titleSlug}`);
  }

  return {
    questionId: question.questionId,
    frontendId: question.questionFrontendId,
    title: question.title,
    slug: question.titleSlug,
    canonicalUrl: `https://leetcode.com/problems/${question.titleSlug}/`,
    typescriptStarter: typescriptSnippet.code,
    exampleTestcases: question.exampleTestcases,
    content: question.content,
  };
}

export function createLeetcodeDescription(question: LeetcodeQuestion): string {
  const converter = new TurndownService({
    codeBlockStyle: "fenced",
    headingStyle: "atx",
    bulletListMarker: "-",
  });
  // LeetCode examples use bare <pre> blocks, without the usual nested <code>.
  converter.addRule("exampleBlocks", {
    filter: "pre",
    replacement: (_content, node) => {
      const text = String(node.textContent ?? "").trimEnd();
      const runs = text.match(/`+/g) ?? [];
      const fence = "`".repeat(Math.max(3, ...runs.map((run) => run.length + 1)));
      return `\n\n${fence}\n${text}\n${fence}\n\n`;
    },
  });
  // Inline code uses textContent, so preserve exponents and indices before conversion.
  const html = question.content
    .replace(/<sup\b[^>]*>([\s\S]*?)<\/sup>/gi, "^$1")
    .replace(/<sub\b[^>]*>([\s\S]*?)<\/sub>/gi, "_$1");
  const statement = converter.turndown(html);

  return `# ${question.frontendId}. ${question.title}

Source: [LeetCode](${question.canonicalUrl})

${statement}
`;
}

export async function scaffoldLeetcodeProblem(
  input: string,
  repositoryRoot: string = process.cwd(),
  fetcher: typeof fetch = fetch,
): Promise<{ directoryName: string; slug: string }> {
  const question = await fetchLeetcodeQuestion(input, fetcher);
  const { slug } = question;
  const directoryName = `${question.frontendId}-${slug}`;
  const problemRoot = path.join(repositoryRoot, "problems", "leetcode");
  let entries: string[];

  try {
    entries = await readdir(problemRoot);
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    entries = [];
  }

  const existing = entries.find(
    (entry) =>
      entry === slug ||
      entry === directoryName ||
      (/^\d+-/.test(entry) && entry.endsWith(`-${slug}`)),
  );

  if (existing) {
    throw new Error(`Problem already exists: ${path.join(problemRoot, existing)}`);
  }

  const name = slug.replace(/-([a-z0-9])/g, (_, char: string) => char.toUpperCase());
  const functionName = /^\d/.test(name) ? `problem${name}` : name;
  const problemDirectory = path.join(problemRoot, directoryName);
  const source = `// Time complexity: TODO
// Space complexity: TODO
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

  await mkdir(problemRoot, { recursive: true });
  await mkdir(problemDirectory);
  await Promise.all([
    writeFile(path.join(problemDirectory, `${slug}.ts`), source, { flag: "wx" }),
    writeFile(path.join(problemDirectory, `${slug}.test.ts`), test, { flag: "wx" }),
    writeFile(path.join(problemDirectory, "description.md"), createLeetcodeDescription(question), {
      flag: "wx",
    }),
  ]);

  return { directoryName, slug };
}
