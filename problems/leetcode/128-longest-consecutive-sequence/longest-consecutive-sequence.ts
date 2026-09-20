// Time complexity: O(n) on average, where n = nums.length
// Space complexity: O(n)
export function longestConsecutive(nums: number[]): number {
  // First we create a set from the input such that we can now
  // check if a number exists in O(1) time complexity
  const numsSet = new Set(nums);

  // We will iterate through the set and for each number, 
  // we will check if it is the start of a sequence
  let maxLength = 0;

  // Then we start the loop to find the longest consecutive sequence
  for (const num of numsSet) {
    // If the number is the start of a sequence, 
    // we will find the length of that sequence
    if (!numsSet.has(num - 1)) {
      // If the number is the start of a sequence, 
      // we will find the length of that sequence
      let current = num;
      
      // Variable to keep track of the length of the current sequence
      let length = 1;

      // While the next number in the sequence exists in the set,
      // we will increment the length
      while (numsSet.has(current + 1)) {
        current += 1;
        length += 1;
      }

      // Update the maximum length found so far
      maxLength = Math.max(maxLength, length);
    }
  }

  // Finally, we return the maximum length of the consecutive sequence found
  return maxLength;
}
