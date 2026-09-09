export async function mapLimit<T, R>(
  inputs: readonly T[],
  limit: number,
  iterateeFn: (value: T, index: number) => R | Promise<R>,
): Promise<R[]> {
  if (!Number.isInteger(limit) || limit < 1) {
    throw new RangeError("limit must be a positive integer");
  }

  const results = Array<R>(inputs.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < inputs.length) {
      const index = nextIndex++;
      results[index] = await iterateeFn(inputs[index], index);
    }
  }

  const workers = Array.from({ length: Math.min(limit, inputs.length) }, () => worker());

  await Promise.all(workers);

  return results;
}
