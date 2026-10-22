import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { LRUCache } from "./lru-cache";

describe("LRUCache", () => {
  it("evicts the least recently used keys in the official operation sequence", () => {
    const cache = new LRUCache(2);

    assert.equal(cache.put(1, 1), undefined);
    assert.equal(cache.put(2, 2), undefined);
    assert.equal(cache.get(1), 1);
    assert.equal(cache.put(3, 3), undefined);
    assert.equal(cache.get(2), -1);
    assert.equal(cache.put(4, 4), undefined);
    assert.equal(cache.get(1), -1);
    assert.equal(cache.get(3), 3);
    assert.equal(cache.get(4), 4);
  });

  it("returns -1 for a key that has never been stored", () => {
    const cache = new LRUCache(1);

    assert.equal(cache.get(0), -1);
  });

  it("replaces the only entry when capacity is one", () => {
    const cache = new LRUCache(1);

    cache.put(1, 10);
    cache.put(2, 20);

    assert.equal(cache.get(1), -1);
    assert.equal(cache.get(2), 20);
  });

  it("updates an existing key without evicting another entry", () => {
    const cache = new LRUCache(2);

    cache.put(1, 10);
    cache.put(2, 20);
    cache.put(1, 30);

    assert.equal(cache.get(1), 30);
    assert.equal(cache.get(2), 20);
  });

  it("makes an updated key the most recently used entry", () => {
    const cache = new LRUCache(2);

    cache.put(1, 10);
    cache.put(2, 20);
    cache.put(1, 30);
    cache.put(3, 40);

    assert.equal(cache.get(2), -1);
    assert.equal(cache.get(1), 30);
    assert.equal(cache.get(3), 40);
  });

  it("keeps a successfully read key when a new entry forces eviction", () => {
    const cache = new LRUCache(2);

    cache.put(1, 10);
    cache.put(2, 20);
    assert.equal(cache.get(1), 10);
    cache.put(3, 30);

    assert.equal(cache.get(2), -1);
    assert.equal(cache.get(1), 10);
  });

  it("leaves eviction order unchanged after a missing-key lookup", () => {
    const cache = new LRUCache(2);

    cache.put(1, 10);
    cache.put(2, 20);
    assert.equal(cache.get(3), -1);
    cache.put(3, 30);

    assert.equal(cache.get(1), -1);
    assert.equal(cache.get(2), 20);
    assert.equal(cache.get(3), 30);
  });

  it("accepts zero values and the maximum key and value", () => {
    const cache = new LRUCache(2);

    cache.put(0, 0);
    cache.put(10_000, 100_000);

    assert.equal(cache.get(0), 0);
    assert.equal(cache.get(10_000), 100_000);
  });

  it("keeps entries up to the maximum capacity before evicting the oldest", () => {
    const cache = new LRUCache(3000);

    for (let key = 0; key < 3000; key++) {
      cache.put(key, key);
    }

    cache.put(3000, 3000);

    assert.equal(cache.get(0), -1);
    assert.equal(cache.get(1), 1);
    assert.equal(cache.get(3000), 3000);
  });
});
