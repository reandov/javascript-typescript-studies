# Projects

Projects are independently runnable applications. Each direct child is an npm workspace with its own `package.json`, TypeScript environment, runtime libraries, and build output.

Run scripts from the repository root with npm's workspace selector:

```bash
npm run dev --workspace=@typescript-studies/debounce-throttle
npm run build --workspace=@typescript-studies/debounce-throttle
```

Project-specific dependencies belong to that project's `package.json`. Formatting and linting remain centralized at the repository root unless a project genuinely requires different tooling.
