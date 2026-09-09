import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { groupAnagrams } from "./group-anagrams";

function normalize(groups: string[][]): string[][] {
  return groups
    .map((group) => [...group].sort())
    .sort((a, b) => a.join(",").localeCompare(b.join(",")));
}

describe("groupAnagrams", () => {
  it("groups the example input by anagram", () => {
    assert.deepEqual(
      normalize(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])),
      normalize([["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]),
    );
  });

  it("preserves duplicate empty strings", () => {
    assert.deepEqual(groupAnagrams(["", ""]), [["", ""]]);
  });

  it("preserves duplicate non-empty strings", () => {
    assert.deepEqual(groupAnagrams(["a", "a"]), [["a", "a"]]);
  });

  it("returns one group for a single string", () => {
    assert.deepEqual(groupAnagrams(["abc"]), [["abc"]]);
  });

  it("returns no groups for an empty input", () => {
    assert.deepEqual(groupAnagrams([]), []);
  });
});
