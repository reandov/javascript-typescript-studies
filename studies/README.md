# Studies

Studies combine explanatory notes with small runnable examples. Organize them by subject and then by concept.

```text
studies/
├── language/
│   └── concept-name/
│       ├── README.md
│       └── example.ts
└── async/
    └── promises/
        ├── README.md
        └── example.ts
```

Add a new subject directory only when it will contain a coherent group of related concepts. Keep one-off exploration in `practice/` or `playground/` instead.

DSA-focused study notes live under [`dsa/`](./dsa/):

- [`dsa/theory/`](./dsa/theory/README.md) contains practical concept notes.
- [`dsa/patterns/`](./dsa/patterns/README.md) contains recurring problem-solving patterns.

Run any example from the repository root:

```bash
npm run example -- studies/language/scope/block-scope.ts
```
