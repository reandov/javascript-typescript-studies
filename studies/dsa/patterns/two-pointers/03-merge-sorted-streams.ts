/** Two forward pointers merge sorted streams without repeatedly searching either input. */

export function mergeSorted(first: readonly number[], second: readonly number[]): number[] {
  const merged: number[] = [];

  let firstIndex = 0;
  let secondIndex = 0;

  // Compare only while both streams still have a current candidate.
  while (firstIndex < first.length && secondIndex < second.length) {
    // Take the smaller head; all later values in that stream are at least as large.
    if (first[firstIndex] <= second[secondIndex]) {
      merged.push(first[firstIndex]);
      firstIndex += 1;
    } else {
      merged.push(second[secondIndex]);
      secondIndex += 1;
    }
  }

  // The other stream is exhausted, so append this already sorted remainder.
  while (firstIndex < first.length) {
    merged.push(first[firstIndex]);
    firstIndex += 1;
  }

  // Handle the symmetric case, including an initially empty first stream.
  while (secondIndex < second.length) {
    merged.push(second[secondIndex]);
    secondIndex += 1;
  }

  return merged;
}
