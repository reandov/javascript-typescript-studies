---
name: new-data-structure
description: Scaffold from-scratch data-structure study implementations and shared helpers in this DSA TypeScript repository. Use when the user asks to add a data structure, helper structure, or DSA utility under data-structures to learn how it works rather than to solve a one-off problem.
---

# New Data Structure

Create from-scratch data-structure study material under `data-structures/`.

## Workflow

1. Inspect `git status --short` and preserve unrelated work.
2. Choose a concise data-structure title and kebab-case slug.
3. Run:

   ```bash
   npm run new-data-structure -- "<Data Structure Name>"
   ```

4. Keep the generated shape:

   ```text
   data-structures/<slug>/
   |-- <slug>.ts
   |-- <slug>.test.ts
   `-- README.md
   ```

5. If the user supplied requirements, refine the README and public API while
   keeping constructors or methods unimplemented unless the user explicitly
   asked for implementation.
6. Add operation-focused tests when expected behavior is defined.
7. Run `npm run check` and the new test directly when tests are executable.

## Guardrails

- Reuse existing helpers under `data-structures/` when that improves
  clarity, but allow self-contained implementations when the learning goal is to
  build the structure from scratch.
- Do not put data-structure study implementations under `problems/`.
- Do not overwrite an existing data-structure directory.
