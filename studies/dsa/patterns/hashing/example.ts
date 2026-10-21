import * as membershipAndComplements from "./01-membership-and-complements";
import * as frequencyCounters from "./02-frequency-counters";
import * as groupBySignature from "./03-group-by-signature";

// Compare membership, multiplicity, and signatures: each lookup stores a different fact.

// 01-membership-and-complements.ts
{
  console.log({
    repeated: membershipAndComplements.firstRepeatedValue([5, 1, 4, 1]),
    pair: membershipAndComplements.pairIndices([3, 2, 8], 10),
  });

  // Insert after checking in the pair example so one element cannot pair with itself.
}

// 02-frequency-counters.ts
{
  console.log({
    equal: frequencyCounters.sameCharacterCounts("listen", "silent"),
    different: frequencyCounters.sameCharacterCounts("aab", "abb"),
  });

  // Deleting zero counts keeps `map.size` meaningful and avoids comparing every key afterward.
}

// 03-group-by-signature.ts
{
  console.log(groupBySignature.groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));

  // A good signature is equal exactly when two inputs belong together. Sorting costs O(k log k)
  // per word; a fixed-alphabet frequency signature can reduce that to O(k).
}

// A complement must come from a different position; counts preserve duplicates.
console.log({
  oneFive: membershipAndComplements.pairIndices([5], 10), // null
  twoFives: membershipAndComplements.pairIndices([5, 5], 10), // [0, 1]
  sameLettersDifferentCounts: frequencyCounters.sameCharacterCounts("aab", "abb"), // false
});
