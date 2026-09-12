import { fetchLeetcodeQuestion } from "./lib/leetcode";

const input = process.argv[2];

if (!input || process.argv.length !== 3) {
  throw new Error("Provide one LeetCode problem URL, slug, or quoted title.");
}

console.log(JSON.stringify(await fetchLeetcodeQuestion(input), null, 2));
