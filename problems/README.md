# Problems

Problems are exercises with a defined statement, inputs, outputs, and constraints. Source-specific collections keep their own namespace when provenance determines the prompt and scaffolding workflow.

- [`leetcode/`](./leetcode/README.md) contains one directory per LeetCode problem.
- [`custom/`](./custom/README.md) contains custom interview problems with local prompts.

Each problem README should include:

1. The problem statement in your own words.
2. Representative examples and edge cases.
3. Constraints.
4. Time and space complexity for each solution.
5. A link to the original source when applicable.

Keep alternative approaches in clearly named TypeScript files when a problem has several meaningfully different solutions. Keep solution modules free of import-time demonstrations and place executable cases in adjacent `*.test.ts` files.

Create scaffolds from the repository root:

```bash
npm run new-leetcode -- "Problem Name"
npm run new-custom-problem -- "Custom Problem Name"
```
