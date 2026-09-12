import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isPalindrome } from "./valid-palindrome";

describe("isPalindrome", () => {
  it("accepts a palindrome phrase despite capitalization and punctuation", () => {
    assert.equal(isPalindrome("A man, a plan, a canal: Panama"), true);
  });

  it("rejects a phrase whose alphanumeric characters are not a palindrome", () => {
    assert.equal(isPalindrome("race a car"), false);
  });

  it("accepts a space whose removal leaves no characters", () => {
    assert.equal(isPalindrome(" "), true);
  });

  it("accepts a single letter", () => {
    assert.equal(isPalindrome("a"), true);
  });

  it("accepts a single digit", () => {
    assert.equal(isPalindrome("7"), true);
  });

  it("treats uppercase and lowercase versions of a letter as equal", () => {
    assert.equal(isPalindrome("Aa"), true);
  });

  it("rejects two different letters", () => {
    assert.equal(isPalindrome("ab"), false);
  });

  it("retains digits when ignoring punctuation", () => {
    assert.equal(isPalindrome("12,21"), true);
  });

  it("rejects a digit and letter that do not match", () => {
    assert.equal(isPalindrome("0P"), false);
  });

  it("accepts input containing only punctuation", () => {
    assert.equal(isPalindrome(".,!?"), true);
  });

  it("accepts a repeated letter at the maximum allowed input length", () => {
    assert.equal(isPalindrome("a".repeat(200_000)), true);
  });
});
