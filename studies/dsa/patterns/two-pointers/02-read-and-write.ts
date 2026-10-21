/**
 * READ/WRITE POINTERS
 *
 * The read pointer examines every value. The write pointer marks the next position belonging
 * to the compacted result. This is common in in-place filtering and duplicate removal.
 */

export function removeValue(values: number[], unwanted: number): number {
  // Everything before write is the kept prefix; write is the next free result slot.
  let write = 0;

  for (let read = 0; read < values.length; read++) {
    // Skipping a value advances read without extending the result.
    if (values[read] === unwanted) {
      continue;
    }

    // Copy the accepted value forward; write never passes unread input.
    values[write] = values[read];
    write += 1;
  }

  // Only this prefix length is meaningful; the array tail is left unspecified.
  return write;
}
