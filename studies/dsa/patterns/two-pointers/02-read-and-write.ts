/**
 * READ/WRITE POINTERS
 *
 * The read pointer examines every value. The write pointer marks the next position belonging
 * to the compacted result. This is common in in-place filtering and duplicate removal.
 */

export function removeValue(values: number[], unwanted: number): number {
  // Everything before writeIndex is the kept prefix; writeIndex is the next free result slot.
  let writeIndex = 0;

  for (let readIndex = 0; readIndex < values.length; readIndex++) {
    // Skipping a value advances readIndex without extending the result.
    if (values[readIndex] === unwanted) {
      continue;
    }

    // Copy the accepted value forward; writeIndex never passes unread input.
    values[writeIndex] = values[readIndex];
    writeIndex += 1;
  }

  // Only this prefix length is meaningful; the array tail is left unspecified.
  return writeIndex;
}
