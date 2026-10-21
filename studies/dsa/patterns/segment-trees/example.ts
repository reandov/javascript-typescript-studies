import * as coveredIntegerCounter from "./covered-integer-counter";

// Track union coverage after overlapping additions; repeated coverage must not count twice.

// covered-integer-counter.ts
{
  const counter = new coveredIntegerCounter.CoveredIntegerCounter(1, 1_000_000_000);
  counter.add(2, 5);
  counter.add(4, 8);
  console.log({ coveredIntegers: counter.count() });

  // The tree height is O(log M), where M is the coordinate-domain size. A fully covered node
  // prunes all later work below it. For a static batch of intervals, sorting/merging is simpler.
}

// Repeated coverage is counted once, and updates are clipped to the domain.
{
  const counter = new coveredIntegerCounter.CoveredIntegerCounter(1, 10);
  counter.add(2, 5);
  console.log({ afterFirst: counter.count() }); // 4
  counter.add(4, 8);
  console.log({ afterOverlap: counter.count() }); // 7
  counter.add(3, 4);
  console.log({ afterContained: counter.count() }); // 7
  counter.add(-10, 1);
  console.log({ afterClipped: counter.count() }); // 8
}
