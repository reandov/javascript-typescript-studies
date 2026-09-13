# 209. Minimum Size Subarray Sum

Source: [LeetCode](https://leetcode.com/problems/minimum-size-subarray-sum/)

Given an array of positive integers `nums` and a positive integer `target`, return _the **minimal length** of a_ _subarray_ _whose sum is greater than or equal to_ `target`. If there is no such subarray, return `0` instead.

A subarray is a nonempty, contiguous sequence of elements. Return its length, not
its sum or elements. A sum greater than the target also qualifies. The input array
is never empty; a single element may qualify, or the entire array may be required.

**Example 1:**

```
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
```

**Example 2:**

```
Input: target = 4, nums = [1,4,4]
Output: 1
```

**Example 3:**

```
Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0
```

**Constraints:**

- `1 <= target <= 10^9`
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^4`

**Follow up:** If you have figured out the `O(n)` solution, try coding another solution of which the time complexity is `O(n log(n))`.
