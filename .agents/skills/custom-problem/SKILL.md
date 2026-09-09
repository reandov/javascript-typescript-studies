---
name: custom-problem
description: Create, improve, and test custom interview-style coding problems in this DSA TypeScript repository. Use when the user asks to create a custom problem from a pasted prompt, scaffold a non-LeetCode problem under problems/custom, improve a custom problem prompt.md, or generate node:test tests for a custom problem prompt.
---

# Custom Problem

Work with custom interview problems under `problems/custom/`, separate from
LeetCode problems under `problems/leetcode/`.

## Repository Shape

Each custom problem lives at:

```text
problems/custom/<slug>/
|-- <slug>.ts
|-- <slug>.test.ts
`-- prompt.md
```

`problems/custom/README.md` is the custom problem index.

## Create A Custom Problem

1. Inspect `git status --short`.
2. Pick a concise human title from the user request.
3. Run:

   ```bash
   npm run new-custom-problem -- "<title>"
   ```

4. If the user supplied the full description, replace `prompt.md` with a clean
   prompt that preserves the intended behavior and includes:
   - problem statement
   - exported function signature, when known
   - examples
   - constraints
   - edge cases or notes
5. If the prompt defines a concrete function signature, update the source stub
   to export that signature and keep `throw new Error("Not implemented");`.
6. Keep changes limited to the new custom problem and
   `problems/custom/README.md` unless the user asks for tooling changes.

## Improve prompt.md

1. Read the target `prompt.md`, source, and tests.
2. Rewrite the prompt for clarity without changing the challenge unless the user
   explicitly asks for a behavior change.
3. Make inputs, outputs, constraints, examples, and ambiguous cases explicit.
4. Do not implement the solution while improving a prompt.

## Generate Tests

1. Read `prompt.md` and the source signature.
2. Replace placeholder tests with executable `node:test` cases.
3. Use `node:assert/strict`.
4. Cover canonical examples, minimum input, boundary behavior, duplicates,
   empty input only when allowed, invalid cases only when the prompt defines
   invalid behavior, and order normalization only when the prompt permits any
   order.
5. If the source signature is still generic but the prompt clearly defines a
   signature, update the source signature while leaving the body unimplemented.
6. Run `npm run check` and the custom problem test directly:

   ```bash
   npx tsx --test problems/custom/<slug>/<slug>.test.ts
   ```

7. If the solution is still a placeholder, confirm failures come from
   `Error: Not implemented`. If the user has implemented it, tests should pass.

## Guardrails

- Never put custom problems under `problems/leetcode/`.
- Never overwrite an existing custom problem.
- Never invent requirements that are not in the prompt; mark ambiguities in
  `prompt.md` instead.
- Never solve the challenge unless the user explicitly asks for implementation.
