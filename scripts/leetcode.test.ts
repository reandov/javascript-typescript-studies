import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, it } from "node:test";

import {
  createLeetcodeDescription,
  fetchLeetcodeQuestion,
  scaffoldLeetcodeProblem,
} from "./lib/leetcode";

const officialQuestion = {
  questionId: "9999",
  questionFrontendId: "383",
  title: "Ransom Note",
  titleSlug: "ransom-note",
  content: `<p>Build <code>ransomNote</code> from the available letters.</p>
<pre><strong>Input:</strong> ransomNote = "aa", magazine = "aab"
<strong>Output:</strong> true</pre>
<ul><li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li>Read <code>word<sub>i</sub></code>.</li></ul>
<p><a href="https://leetcode.com/problems/ransom-note/">Source link</a></p>
<img src="https://assets.leetcode.com/example.png" alt="Example diagram">`,
  exampleTestcases: '"aa"\n"aab"',
  codeSnippets: [
    { langSlug: "typescript", code: "function canConstruct(a: string, b: string): boolean {}" },
  ],
};

function mockApi(question: unknown = officialQuestion): typeof fetch {
  return async () => Response.json({ data: { question } });
}

describe("LeetCode metadata and scaffolding", () => {
  it("uses the canonical slug and public number from the official API", async () => {
    let requestedSlug: string | undefined;
    const fetcher: typeof fetch = async (url, init) => {
      assert.equal(url, "https://leetcode.com/graphql/");
      const body = JSON.parse(String(init?.body)) as { variables: { titleSlug: string } };
      requestedSlug = body.variables.titleSlug;
      return Response.json({ data: { question: officialQuestion } });
    };

    const result = await fetchLeetcodeQuestion(
      "https://www.leetcode.com/problems/shared-slug/description/?envType=study-plan",
      fetcher,
    );

    assert.equal(requestedSlug, "shared-slug");
    assert.equal(result.slug, "ransom-note");
    assert.equal(result.frontendId, "383");
    assert.equal(result.questionId, "9999");
    assert.equal(result.canonicalUrl, "https://leetcode.com/problems/ransom-note/");
  });

  it("accepts a title or slug while rejecting nonofficial URLs before fetching", async () => {
    for (const input of ["Ransom Note", "ransom-note"]) {
      assert.equal((await fetchLeetcodeQuestion(input, mockApi())).slug, "ransom-note");
    }

    const unexpectedFetch: typeof fetch = async () => {
      assert.fail("Invalid input must not cause a network request");
    };
    for (const input of [
      "https://example.com/problems/ransom-note/",
      "http://leetcode.com/problems/ransom-note/",
      "https://leetcode.com/discuss/",
      "https://leetcode.com/problems/../",
      "!!!",
    ]) {
      await assert.rejects(fetchLeetcodeQuestion(input, unexpectedFetch));
    }
  });

  it("preserves example blocks, mathematical constraints, links, and images in Markdown", async () => {
    const question = await fetchLeetcodeQuestion("ransom-note", mockApi());
    const description = createLeetcodeDescription(question);

    assert.ok(description.includes(question.canonicalUrl));
    assert.ok(description.includes('Input: ransomNote = "aa", magazine = "aab"\nOutput: true'));
    assert.ok(description.includes("```"));
    assert.ok(description.includes("`1 <= n <= 10^5`"));
    assert.ok(description.includes("`word_i`"));
    assert.ok(description.includes("![Example diagram](https://assets.leetcode.com/example.png)"));
  });

  it("creates all three files and refuses to overwrite a numbered problem", async (context) => {
    const root = await mkdtemp(path.join(tmpdir(), "leetcode-scaffold-"));
    context.after(() => rm(root, { recursive: true, force: true }));

    const result = await scaffoldLeetcodeProblem("Ransom Note", root, mockApi());
    const directory = path.join(root, "problems", "leetcode", result.directoryName);
    assert.equal(result.directoryName, "383-ransom-note");
    assert.deepEqual((await readdir(directory)).sort(), [
      "description.md",
      "ransom-note.test.ts",
      "ransom-note.ts",
    ]);
    const source = await readFile(path.join(directory, "ransom-note.ts"), "utf8");
    assert.ok(source.includes("export function ransomNote"));
    assert.ok(!source.includes("Description:"));
    const test = await readFile(path.join(directory, "ransom-note.test.ts"), "utf8");
    assert.ok(test.includes('from "./ransom-note"'));

    const sourcePath = path.join(directory, "ransom-note.ts");
    await writeFile(sourcePath, "user changes");
    await assert.rejects(
      scaffoldLeetcodeProblem("ransom-note", root, mockApi()),
      /Problem already exists/,
    );
    assert.equal(await readFile(sourcePath, "utf8"), "user changes");
  });

  it("refuses to duplicate a legacy folder", async (context) => {
    const root = await mkdtemp(path.join(tmpdir(), "leetcode-scaffold-"));
    context.after(() => rm(root, { recursive: true, force: true }));
    const directory = path.join(root, "problems", "leetcode", "ransom-note");
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "ransom-note.ts"), "legacy solution");

    await assert.rejects(
      scaffoldLeetcodeProblem("ransom-note", root, mockApi()),
      /Problem already exists/,
    );
    assert.equal(await readFile(path.join(directory, "ransom-note.ts"), "utf8"), "legacy solution");
    assert.deepEqual(await readdir(path.dirname(directory)), ["ransom-note"]);
  });

  it("reports failed or incomplete metadata without creating files", async (context) => {
    const root = await mkdtemp(path.join(tmpdir(), "leetcode-scaffold-"));
    context.after(() => rm(root, { recursive: true, force: true }));
    const httpFailure: typeof fetch = async () => new Response(null, { status: 403 });
    const graphqlFailure: typeof fetch = async () =>
      Response.json({ errors: [{ message: "Unavailable" }] });
    const failures: Array<[typeof fetch, RegExp]> = [
      [httpFailure, /403/],
      [graphqlFailure, /Unavailable/],
      [mockApi(null), /not found/],
      [mockApi({ ...officialQuestion, content: null }), /No official statement/],
      [mockApi({ ...officialQuestion, codeSnippets: [] }), /No TypeScript starter/],
      [mockApi({ ...officialQuestion, questionFrontendId: "../383" }), /invalid problem number/],
      [mockApi({ ...officialQuestion, titleSlug: "../ransom-note" }), /invalid problem number/],
    ];

    for (const [fetcher, expected] of failures) {
      await assert.rejects(scaffoldLeetcodeProblem("ransom-note", root, fetcher), expected);
    }
    assert.deepEqual(await readdir(root), []);
  });
});
