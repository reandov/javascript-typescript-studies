# TypeScript studies

A purpose-first workspace for TypeScript language studies, deliberate practice, coding problems, reference implementations, and small applications.

## Repository map

| Area                                              | Purpose                                                      |
| ------------------------------------------------- | ------------------------------------------------------------ |
| [`studies/`](./studies/README.md)                 | Notes and focused examples that explain language concepts    |
| [`practice/`](./practice/README.md)               | Informal drills without a formal problem statement           |
| [`problems/`](./problems/README.md)               | Defined coding challenges with solutions and tests           |
| [`algorithms/`](./algorithms/README.md)           | Reference implementations with complexity analysis and tests |
| [`data-structures/`](./data-structures/README.md) | Reusable structures with documented behavior and tests       |
| [`projects/`](./projects/README.md)               | Independently runnable browser or Node applications          |
| [`playground/`](./playground/README.md)           | Disposable local experiments that are ignored by Git         |

The repository root owns shared formatting, linting, type-checking, and test tooling. Applications under `projects/` are npm workspaces and own their runtime-specific configuration.

The problem collection currently includes [LeetCode solutions](./problems/leetcode/README.md), [custom interview problems](./problems/custom/README.md), and [shared binary-tree helpers](./data-structures/README.md) migrated from the former `dsa-ts` repository.

## Setup

```bash
npm install
```

## Common commands

```bash
# Run a TypeScript example.
npm run example -- studies/language/closures/counter.ts

# Type-check Node exercises and every project workspace.
npm run check

# Run algorithm, data-structure, and problem tests.
npm test

# Build only actual projects.
npm run build

# Check repository quality.
npm run lint
npm run fmt:check
```

Scaffold new DSA material:

```bash
npm run new-leetcode -- "Problem Name"
npm run new-custom-problem -- "Custom Problem Name"
npm run new-algorithm -- "Algorithm Name"
npm run new-data-structure -- "Data Structure Name"
npm run new-theory -- "Topic Name"
```

Run a project script by selecting its workspace:

```bash
npm run dev --workspace=@typescript-studies/debounce-throttle
```

## TypeScript environments

Node-oriented studies, practice, problems, algorithms, and data structures share [`tsconfig.node.json`](./tsconfig.node.json) and run directly through `tsx`.

Browser and framework projects extend [`tsconfig.base.json`](./tsconfig.base.json) with their own libraries, module resolution, and build tools. This prevents DOM types and browser build behavior from leaking into Node exercises.

## Conventions

- Keep notes in a `README.md` beside their examples.
- Keep tests beside the implementation as `*.test.ts`.
- Use `example.ts` for a runnable demonstration of reusable code.
- Add an `index.ts` only when a folder exposes a meaningful public API.
- Do not commit generated output, coverage, dependencies, or playground files.
- Give every project its own `package.json` and `tsconfig.json`.
