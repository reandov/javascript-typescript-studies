---
name: new-problem
description: Scaffold a LeetCode problem in this DSA TypeScript repository from its problem URL. Use when the user invokes `/new-problem` or `$new-problem` with a LeetCode URL, supplies a LeetCode problem URL to prepare for solving, or asks to create a correctly named TypeScript solution stub and executable tests under problems/leetcode without implementing the algorithm.
---

# New Problem

Create a compile-ready problem scaffold from official LeetCode metadata. Leave
the algorithm unimplemented and the new tests failing only at the explicit
placeholder so the user can use test-driven development.

## Workflow

1. Validate the input.
   - Require exactly one canonical or shareable LeetCode problem URL.
   - Resolve redirects and identify the canonical
     `https://leetcode.com/problems/<slug>/` URL.
   - Reject non-LeetCode URLs and URLs that do not identify a problem.

2. Inspect the repository before editing.
   - Read `AGENTS.md`, `package.json`, `scripts/new-problem.ts`, and one recent
     problem and test pair.
   - Check `git status` and preserve unrelated work.
   - Stop if `problems/leetcode/<slug>/` already exists; report its path
     instead of overwriting it.

3. Fetch official problem metadata.
   - Run:

     ```bash
     npm run fetch-leetcode -- "<url>"
     ```

   - The helper validates the URL and queries LeetCode's official GraphQL API
     for the canonical slug, title, TypeScript starter, example test cases, and
     statement HTML.
   - Use the statement HTML only to identify example outputs and constraints.
   - If the API is unavailable, fetch the canonical official problem page as a
     fallback. Do not use third-party copies for the function signature.
   - Extract the canonical slug, title, TypeScript starter signature, parameter
     names and types, return type, examples, and constraints.
   - Do not infer a signature from the title when official TypeScript starter
     code is available.
   - Do not copy editorials, solution code, or the full problem statement.
   - If neither official source can be fetched, report the blocker rather than
     generating a potentially incorrect API.

4. Generate the initial files.
   - Run `npm run new-leetcode -- "<canonical slug>"`.
   - Keep the repository convention:

     ```text
     problems/leetcode/<slug>/<slug>.ts
     problems/leetcode/<slug>/<slug>.test.ts
     ```

   - Do not introduce `index.ts`.

5. Replace the generic source stub.
   - Rename the exported function to the official TypeScript starter function.
   - Reproduce its parameter names, parameter types, and return type.
   - Add only the minimal local or shared type definitions required to compile.
   - Reuse existing tree utilities and types when applicable.
   - Add concise JSDoc containing the official title, a paraphrased objective,
     and `TODO` markers for the approach and complexity.
   - Use this implementation body until the user codes the solution:

     ```ts
     throw new Error("Not implemented");
     ```

   - Do not implement or hint at the algorithm.

6. Replace the generated test stub.
   - Import `node:assert/strict`, `describe`, `it`, and the exported function.
   - Convert every official example into an executable test when its input can
     be represented by repository utilities.
   - Add focused boundary cases directly supported by the constraints, such as
     empty or minimum-size input. Do not invent behavior outside the contract.
   - Use behavioral test names rather than `example 1`.
   - Match the assertion to the output contract:
     - Use `assert.equal` for primitives.
     - Use `assert.deepEqual` for arrays and objects.
     - Normalize only when the problem explicitly permits output in any order.
     - Use `buildTree` and `treeToArray` for binary-tree inputs and outputs.
   - Tests must call the official function with the correct argument order.
   - Do not use `it.todo`, skip tests, or weaken assertions to accommodate the
     placeholder implementation.

7. Update documentation.
   - Add the problem alphabetically to the Solved Problems table in
     `problems/leetcode/README.md`.
   - Link to the local source file and canonical LeetCode URL.

8. Validate the scaffold.
   - Run `npm run check`; it must pass.
   - Run the new test file directly with
     `npx tsx --test problems/leetcode/<slug>/<slug>.test.ts`.
   - Confirm failures come from `Error: Not implemented`. Treat that expected
     red state as successful scaffold validation.
   - Run `git diff --check`.
   - Do not run the complete suite while the intentional failing tests exist.

9. Report the result.
   - State the title, canonical URL, created paths, exported signature, number of
     tests, and validation results.
   - Explicitly state that tests intentionally fail until implementation.
   - Do not commit or push unless the user separately requests it.

## Guardrails

- Never overwrite an existing problem.
- Never solve the challenge as part of scaffolding.
- Never guess missing metadata or silently change the official function API.
- Keep changes limited to the new problem and `problems/leetcode/README.md`.
- Preserve repository formatting and strict TypeScript compatibility.
