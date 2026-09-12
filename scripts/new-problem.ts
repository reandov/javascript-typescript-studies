import { scaffoldLeetcodeProblem } from "./lib/leetcode";

async function createProblem(): Promise<void> {
  const input = process.argv.slice(2).join(" ").trim();

  if (!input) {
    throw new Error(
      'Provide a LeetCode URL or title, for example: npm run new-leetcode -- "https://leetcode.com/problems/two-sum/"',
    );
  }

  const { directoryName, slug } = await scaffoldLeetcodeProblem(input);

  console.log(`Created problems/leetcode/${directoryName}/`);
  console.log("  description.md");
  console.log(`  ${slug}.ts`);
  console.log(`  ${slug}.test.ts`);
}

createProblem().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Could not create problem: ${message}`);
  process.exitCode = 1;
});
