---
name: theory-note
description: Create or improve practical DSA theory and pattern notes in this TypeScript repository. Use when the user asks for theory, explanations, pattern documentation, study notes, or conceptual writeups under studies/dsa/theory or studies/dsa/patterns.
---

# Theory Note

Work with practical DSA notes under `studies/dsa/theory/` and `studies/dsa/patterns/`.

## Create A Note

1. Inspect `git status --short`.
2. Choose whether the content belongs in:
   - `studies/dsa/theory/` for concepts and data-structure/algorithm fundamentals.
   - `studies/dsa/patterns/` for recurring problem-solving approaches.
3. For theory notes, run:

   ```bash
   npm run new-theory -- "<Topic Name>"
   ```

4. For pattern notes, create `studies/dsa/patterns/<slug>.md` only when a single file is
   enough; use a folder with `README.md` if examples or linked resources are
   expected to grow.
5. Keep notes practical:
   - mental model
   - when to use it
   - common pitfalls
   - complexity notes
   - related algorithms, data structures, and solved problems

## Guardrails

- Do not add solution code to theory notes unless the user explicitly asks for
  code examples.
- Prefer links to existing repository code over duplicating large snippets.
- Keep notes concise and oriented toward problem solving.
