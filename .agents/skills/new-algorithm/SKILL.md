---
name: new-algorithm
description: Scaffold from-scratch algorithm study implementations in this DSA TypeScript repository. Use when the user asks to add a general algorithm, random algorithm, algorithm template, or algorithm study entry under algorithms rather than solving a specific LeetCode/custom problem or building a shared utility library.
---

# New Algorithm

Create from-scratch algorithm study material under `algorithms/`.

## Workflow

1. Inspect `git status --short` and preserve unrelated work.
2. Choose a concise algorithm title and kebab-case slug.
3. Run:

   ```bash
   npm run new-algorithm -- "<Algorithm Name>"
   ```

4. Keep the generated shape:

   ```text
   algorithms/<slug>/
   |-- <slug>.ts
   |-- <slug>.test.ts
   `-- README.md
   ```

5. If the user supplied requirements, refine the README and exported function
   signature while keeping `throw new Error("Not implemented");` unless the user
   explicitly asked for implementation.
   - It is acceptable for an algorithm folder to define local example types or
     data representations when that makes the concept clearer.
   - Do not force the implementation to import shared data structures unless the
     user specifically wants integration.
6. Add focused tests only when expected behavior is defined.
7. Run `npm run check` and the new test directly when tests are executable.

## Guardrails

- Do not put algorithm study implementations under `problems/`.
- Do not overwrite an existing algorithm directory.
- Do not implement the algorithm unless the user explicitly asks for the
  implementation.
