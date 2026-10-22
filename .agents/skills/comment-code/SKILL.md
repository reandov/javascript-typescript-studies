---
name: comment-code
description: Add or improve concise teaching comments throughout selected code in this TypeScript learning repository. Use when the user asks to comment code, explain an implementation inline, or clarify existing code comments while preserving the implementation.
---

# Comment Code

Make an implementation readable as a guided walkthrough. Teach what each
meaningful step does, how state changes, and why the steps work together.
Keep the explanations beside the code, using short, concrete comments.

## Understand the implementation

- Resolve the selected file or problem from the request and conversation.
  Read its source, nearby tests, and relevant problem statement or documentation.
- Inspect the working-tree diff before editing so existing user changes survive.
- Trace control flow and state before describing them. Distinguish assumptions
  guaranteed by the problem from behavior actually enforced by the code.
- When matching a requested style, inspect the named example or relevant Git
  history. Do not require a history search for every ordinary commenting task.

## Write a concise walkthrough

- Use plain English `//` comments immediately above the relevant code.
  Usually use one sentence on one line; use two or three short lines when a
  subtle invariant or shared-state relationship needs more explanation.
- Cover the meaningful stages throughout the implementation: setup, loops,
  branches, state updates, recursive calls, and results. Simple operations can
  deserve comments when they connect those stages for a learner; do not apply
  an "only explain why" rule that removes the step-by-step walkthrough.
- Explain an operation in its local role. Prefer "Read the next queued word,
  then advance head without shifting the array" over "Increment head."
  Avoid narrating syntax without explaining what it accomplishes.
- Describe what variables mean at the point of use: whether a sum includes
  the current node, whether a length counts words or transformations, or
  whether a queue entry belongs to the current or next level.
- Explain important ordering: marking visited before enqueuing, updating a
  predecessor after comparison, or processing children before their parent.
- Explain base cases, early returns, short-circuit evaluation, and final
  fallback results in terms of the problem or function contract.
- Add a tiny example when it makes a transformation easier to see, such as
  `"hit"` producing `"*it"`, `"h*t"`, and `"hi*"`. Check the example against
  the exact operation; a one-letter wildcard must replace exactly one letter.
- Keep existing useful context. Correct, tighten, or replace unclear comments
  in place rather than stripping them to make the file shorter. Combine nearby
  comments only when the same teaching points remain clear at their use sites.
- Avoid large introductory essays, repeated algorithm definitions, comments
  on every brace, and several comments repeating the same fact. Spend extra
  words on the subtle step rather than making every comment equally long.

For example, preserve both the operation and its role in BFS:

```ts
// Freeze the current BFS level; newly enqueued words belong to the next level.
const levelSize = queue.length - head;

// Process only the words at the current distance.
for (let i = 0; i < levelSize; i++) {
  // Read the next queued word, then advance head without shifting the array.
  const word = queue[head++];
  // Continue with this word's processing...
}
```

## Preserve behavior and verify

- Change comments and necessary surrounding whitespace only. Preserve names,
  expressions, control flow, public APIs, tests, and unrelated files. If a bug
  becomes apparent, report it separately unless fixing it was also requested.
- Describe the implementation as written, including repeated work; do not
  describe an optimization it does not perform. Verify existing complexity
  comments and correct them when needed, defining the variables used.
  For LeetCode solutions, keep time and space complexity immediately above
  the exported solution function or class, following repository conventions.
- Review the diff for accidental executable changes and comments that imply
  more than the code guarantees. Read the comments in order to check that the
  walkthrough remains connected and concise.
- Run the checks required by applicable repository instructions. Fix formatting
  only in the selected files and report unrelated failures without broad cleanup.
- Report the file updated, the teaching context improved, and validation results.
