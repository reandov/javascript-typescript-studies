---
name: problem-understanding
description: Analyze coding challenge prompts, especially LeetCode-style problems, without giving solution code. Use when the user asks to understand a problem statement, identify patterns, interpret constraints, derive examples, clarify edge cases, discuss likely data structures or algorithm families, or plan how to think about a problem while explicitly avoiding code or full implementation details.
---

# Problem Understanding

Help the user understand a coding problem deeply without giving code or a complete implementation.

## Core Rules

- Do not provide source code, pseudocode that is directly translatable line-by-line, or final implementation steps.
- Do not reveal a full solution unless the user explicitly changes the request and asks for one.
- Keep the explanation problem-focused: objective, inputs, outputs, constraints, examples, patterns, edge cases, and reasoning cues.
- Use concise, concrete language. Prefer small examples and invariants over broad theory.
- If the prompt is ambiguous, call out the ambiguity and state the most likely interpretation.

## Workflow

1. Restate the task in plain language.
   - Identify what must be returned.
   - Identify what each input represents.
   - Point out whether the function mutates input, returns a count, returns a structure, or reports feasibility.

2. Decode the examples.
   - Walk through each provided example at a high level.
   - Explain why the expected output follows from the rules.
   - Avoid tracing a complete algorithm.

3. Extract constraints and implications.
   - Convert size limits into practical complexity expectations.
   - Highlight constraints that rule out naive approaches.
   - Note special guarantees such as sorted input, uniqueness, lowercase letters, tree shape, graph connectivity, or valid ranges.

4. Identify likely patterns.
   - Name candidate patterns such as sliding window, two pointers, hash map counting, prefix sums, BFS, DFS, dynamic programming, backtracking, heap, union-find, binary search, greedy, topological sort, or graph shortest path.
   - Explain why each pattern might fit based on problem signals.
   - If several patterns are plausible, compare them conceptually without choosing code details.

5. Surface edge cases.
   - Include minimum-size inputs.
   - Include empty input only when allowed by constraints.
   - Include duplicates, all-same values, missing targets, disconnected cases, negative values, overflow-sensitive sums, or boundary lengths when relevant.
   - Distinguish valid edge cases from cases outside the contract.

6. Give a no-code thinking plan.
   - Provide a short sequence of reasoning checkpoints.
   - Phrase steps as questions or observations, not implementation instructions.
   - Stop before mechanical coding details.

## Output Shape

Use this structure when it fits the request:

- **Plain-English Goal**: one or two sentences.
- **Inputs And Output**: brief bullets.
- **Example Intuition**: concise walkthroughs.
- **Constraint Signals**: what the limits imply.
- **Likely Patterns**: names plus why they fit.
- **Edge Cases**: valid cases to keep in mind.
- **No-Code Plan**: conceptual checkpoints.

For smaller questions, answer only the relevant sections.

## Guardrails

- If the user asks, "what pattern is this?", answer with pattern candidates and signals, not code.
- If the user asks for hints, give progressive hints from weakest to strongest and stop after a few.
- If the user asks for complexity, discuss target complexity and why constraints suggest it.
- If the user asks for tests, describe test ideas or expected behavior; do not write test code unless they explicitly ask for code.
- If a full solution starts to emerge, summarize the insight at a higher level instead of spelling out implementation mechanics.
