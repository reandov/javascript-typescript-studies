import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isValid } from "./valid-parentheses";

describe("isValid", () => {
  it("accepts a matching pair", () => {
    assert.equal(isValid("()"), true);
  });

  it("accepts consecutive pairs of all bracket types", () => {
    assert.equal(isValid("()[]{}"), true);
  });

  it("rejects mismatched bracket types", () => {
    assert.equal(isValid("(]"), false);
  });

  it("rejects mismatched bracket types at the beginning", () => {
    assert.equal(isValid("(])"), false);
  });

  it("accepts correctly nested pairs", () => {
    assert.equal(isValid("([])"), true);
  });

  it("rejects crossing pairs", () => {
    assert.equal(isValid("([)]"), false);
  });

  it("rejects a single opening bracket", () => {
    assert.equal(isValid("("), false);
  });

  it("rejects a single closing bracket", () => {
    assert.equal(isValid(")"), false);
  });

  it("rejects a closing bracket before its opening bracket", () => {
    assert.equal(isValid(")("), false);
  });

  it("rejects an unclosed outer pair", () => {
    assert.equal(isValid("([]"), false);
  });

  it("rejects an extra closing bracket", () => {
    assert.equal(isValid("())"), false);
  });

  it("accepts multiple levels of nested bracket types", () => {
    assert.equal(isValid("{[()]}"), true);
  });

  it("accepts nested pairs at the maximum input length", () => {
    assert.equal(isValid("(".repeat(5_000) + ")".repeat(5_000)), true);
  });

  it("rejects unmatched openings at the maximum input length", () => {
    assert.equal(isValid("(".repeat(10_000)), false);
  });
});
