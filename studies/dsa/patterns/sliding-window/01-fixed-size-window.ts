/** Fixed-size window: outgoing value leaves, incoming value enters. */

export function windowAverages(values: readonly number[], width: number): number[] {
  // No full window exists outside these bounds; width is assumed to be an integer.
  if (width <= 0 || width > values.length) {
    return [];
  }

  const averages: number[] = [];
  let sum = 0;

  // Build the first full window once before beginning the incremental updates.
  for (let index = 0; index < width; index++) {
    sum += values[index];
  }

  averages.push(sum / width);

  for (let right = width; right < values.length; right++) {
    // The old leftmost value falls out as right enters the next window.
    const leavingIndex = right - width;

    // Reuse the previous sum by removing only the outgoing contribution.
    sum -= values[leavingIndex];
    sum += values[right];

    // The updated summary now describes exactly width consecutive values.
    averages.push(sum / width);
  }

  return averages;
}
