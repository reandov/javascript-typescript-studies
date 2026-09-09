# Map with a concurrency limit

`mapLimit` applies an asynchronous or synchronous function to every input while running no more than `limit` operations concurrently. Results preserve input order even when operations finish in a different order.

```ts
const results = await mapLimit([1, 2, 3], 2, async (value) => value * 2);
// [2, 4, 6]
```

For `n` inputs, the implementation uses `O(n)` result storage and performs `O(n)` iterations. At most `min(limit, n)` worker promises are active. The duration depends on the work performed by the supplied iteratee.

Run the demonstration or its tests from the repository root:

```bash
npm run example -- algorithms/concurrency/map-limit/example.ts
npm test
```
