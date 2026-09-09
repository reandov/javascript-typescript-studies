# Repository instructions

These instructions apply to the entire repository. A more specific `AGENTS.md` in a child directory may add to or override them for that subtree.

## Purpose

This is a TypeScript-only learning workspace, not one deployable application. Preserve the separation between educational material, reusable implementations, and independently runnable projects. Do not recreate a global `src/` directory or compile the entire repository into one `dist/` directory.

## Place work by intent

Choose the destination before adding files:

- `studies/`: explanatory notes and focused examples for a concept.
- `practice/`: informal, topic-driven drills without a formal problem statement.
- `problems/`: defined coding challenges with inputs, outputs, constraints, solutions, and tests.
- `algorithms/`: reusable algorithm implementations with documented contracts, complexity, examples, and tests.
- `data-structures/`: reusable structures with documented invariants, operations, complexity, and tests.
- `projects/`: self-contained browser or Node applications. Each direct child is an npm workspace.
- `playground/`: disposable local exploration. Its contents are ignored by Git.

Do not introduce a new top-level category when an existing one accurately describes the work. Within `studies/`, group concepts by subject, such as `language/` or `async/`, rather than by file type or runtime.

## TypeScript and runtime boundaries

- Source code must be TypeScript. Do not add `.js` source variants or enable `allowJs`/`checkJs`.
- All code follows the strict defaults in `tsconfig.base.json`.
- Node-oriented material in `studies/`, `practice/`, `problems/`, `algorithms/`, and `data-structures/` is checked by `tsconfig.node.json` and run directly with `tsx`.
- Keep DOM libraries and browser globals out of the Node configuration.
- Browser projects must own a `tsconfig.json` that extends the root base configuration and adds DOM libraries and bundler resolution.
- DOM projects should use Vite. Their `index.html` should import a TypeScript entry point such as `/src/main.ts`; never generate JavaScript beside TypeScript source files.
- Use extensionless relative imports in TypeScript source under the current bundler-style module resolution.

## Organization and documentation

- Keep a concept's notes in `README.md` beside its examples.
- Keep tests beside implementations and name them `*.test.ts`.
- Name a runnable demonstration `example.ts` when it is separate from reusable code.
- Add `index.ts` only when a directory exposes a meaningful public API; do not create barrel files by default.
- Separate reusable modules from demonstrations and UI wiring. Importing reusable code should not unexpectedly run a demo.
- Problem documentation should state the problem, examples, constraints, edge cases, and complexity.
- Algorithm and data-structure documentation should describe the contract, invariants where relevant, and time and space complexity.
- Update nearby README files and relative links whenever files move or public usage changes.

For coding problems:

- Keep LeetCode problems under `problems/leetcode/<slug>/` and custom interview problems under `problems/custom/<slug>/`.
- Keep one exported solution function or class per implementation unless a small helper type naturally belongs beside it.
- Use `node:test` and `node:assert/strict`; cover canonical examples and meaningful edge cases.
- Prefer self-contained solutions unless a shared helper materially improves clarity.
- Reuse the binary-tree helpers under `data-structures/tree/` for compatible tree inputs and assertions.
- Do not change an existing solution while performing unrelated documentation, test, or repository maintenance work.

## Projects and dependencies

- Every direct child of `projects/` must have its own `package.json`, `tsconfig.json`, and documented development command.
- Project-specific dependencies belong to that project's workspace package. Shared repository tooling belongs in the root package.
- Add or update dependencies with npm so that `package.json` and `package-lock.json` remain synchronized; do not edit the lockfile manually.
- The root `build` command builds workspaces only. Educational and reference code is checked and tested without emitted output.

## Commands

Run commands from the repository root unless a task specifically requires otherwise:

```bash
npm install
npm run example -- path/to/example.ts
npm run new-leetcode -- "Problem Name"
npm run new-custom-problem -- "Custom Problem Name"
npm run new-algorithm -- "Algorithm Name"
npm run new-data-structure -- "Data Structure Name"
npm run new-theory -- "Topic Name"
npm run check
npm test
npm run lint
npm run fmt:check
npm run build
```

Run a specific project with its workspace name, for example:

```bash
npm run dev --workspace=@typescript-studies/debounce-throttle
```

Before handing off a change:

1. Run `npm run check`.
2. Run relevant tests, or `npm test` when shared algorithms, problems, or data structures changed.
3. Run `npm run lint` and `npm run fmt:check`.
4. Run the affected workspace build for project changes; use the root `npm run build` when several projects are affected.
5. Smoke-test moved or newly runnable examples.

## Generated and temporary files

- Do not commit `node_modules/`, `dist/`, coverage output, TypeScript build metadata, or playground contents.
- Do not edit generated bundles. Change their TypeScript source and rebuild instead.
- Use `npm run clean` to remove repository and workspace build output.
- Preserve unrelated user changes in a dirty worktree and avoid destructive Git operations.
