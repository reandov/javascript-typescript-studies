---
name: reset-solution
description: Reset an existing TypeScript coding problem solution in this repository to an unimplemented scaffold for another attempt, preserving its public API, prompt, and tests. Use when the user asks to clear, reset, or start over on a LeetCode or custom problem solution; not for Git resets or unrelated repository maintenance.
---

# Reset Solution

Prepare a selected problem for the user to solve again without providing hints
or replacement solution code. Work inside `problems/leetcode/` or
`problems/custom/` unless the user explicitly selects another implementation.

## Select the target

- Read applicable `AGENTS.md` instructions and inspect `git status --short`.
- Resolve the user's file path, problem number, slug, title, or LeetCode URL
  against local files. Use a target already established in the conversation
  when it is unambiguous. No network fetch is needed for a local reset.
- If the target is missing or several implementations match, ask which one to
  reset before editing. Do not create a new problem or reset every variant by
  default. For multiple targets, reset only the explicitly requested set.
- Read the selected source, adjacent tests, and `description.md` or `prompt.md`
  to identify the public API and required types.

A request to reset a named solution authorizes clearing that implementation,
including its current uncommitted algorithm changes. Preserve unrelated edits.
Creating this skill alone does not authorize resetting any solution.

## Restore the scaffold

Edit the selected implementation directly; do not use `git reset`, `git restore`,
or a scaffolding command that overwrites the problem directory.

- Preserve exported names, parameter names and types, return types, overloads,
  generic constraints, and any externally used types or class members.
- For a function, replace its implementation body with:

  ```ts
  throw new Error("Not implemented");
  ```

- For a class, preserve its constructor and public method signatures, replacing
  their implementation bodies with the same throw. Remove internal state,
  private algorithm methods, and algorithm-bearing initializers. Retain any
  public fields, accessors, or required inheritance scaffolding needed for
  callers and strict TypeScript checks; use the smallest compile-ready
  placeholder. Preserve required `super(...)` calls before a constructor throw.
- Remove solution-specific helpers, unused imports, implementation comments,
  and algorithm hints from the selected source. Keep types and imports needed
  by the public contract, including shared tree types. Do not edit shared helpers.
- Put these comments immediately above the exported solution function or class,
  replacing any previous complexity analysis:

  ```ts
  // Time complexity: TODO
  // Space complexity: TODO
  ```

- Preserve tests, problem statements, README indexes, and other solution files.
  Do not weaken assertions, skip tests, or add a completed alternative solution.
- If the target is already a clean scaffold, report that without unnecessary edits.

## Validate and report

- Format only the changed source using the repository formatter.
- Run `npm run check`, `npm run lint`, `npm run fmt:check`, and `git diff --check`.
  Fix issues introduced by the reset; report unrelated pre-existing failures.
- Run the adjacent tests directly with `npx tsx --test <path-to-test-file>`.
  Failures caused by `Error: Not implemented` are expected; investigate import,
  type, or other unexpected failures. Tests exercising only retained types or
  helpers may still pass. If no test file exists, report that limitation.
- Do not run the full test suite just to reproduce the intentional placeholder
  failures across the repository.
- Review the diff for unintended changes. Report the reset file, preserved API,
  validation results, and expected failing tests. Do not commit or push unless
  separately requested.
