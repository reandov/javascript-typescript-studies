// Time complexity: O(n log n), where n is the number of jobs
// Space complexity: O(n), for the sorted jobs and memoized profits
export function jobScheduling(startTime: number[], endTime: number[], profit: number[]): number {
  // Calculate number of jobs
  const numJobs = startTime.length;

  // Create a unifed array of arrays to store all jobs
  const jobs: number[][] = [];

  // Fill the array with jobs
  for (let job = 0; job < numJobs; job++) {
    jobs.push([startTime[job], endTime[job], profit[job]]);
  }

  // Sort them by start time
  jobs.sort((jobA, jobB) => jobA[0] - jobB[0]);

  // Create memory
  const memo = new Map<number, number>();

  function findMaxProfit(currentIndex: number): number {
    // Base case, if we hit the end of the jobs array, return 0
    if (currentIndex === jobs.length) return 0;

    // If our memo has already calculated this index, return it's profit
    if (memo.has(currentIndex)) return memo.get(currentIndex) ?? 0;

    // Path A: if we skip
    const skipProfit = findMaxProfit(currentIndex + 1);

    // Path B: if we take, first we need to find the next possible job
    const nextValidIndex = binarySearchNextJob(currentIndex, jobs);

    // Path B: calculate the profit of taking
    const takeProfit = jobs[currentIndex][2] + findMaxProfit(nextValidIndex);

    // Decision: Skip or take?
    const bestProfit = Math.max(skipProfit, takeProfit);

    // Save that to memory
    memo.set(currentIndex, bestProfit);

    return bestProfit;
  }

  return findMaxProfit(0);
}

// Helper to find next valid job based on endTime
function binarySearchNextJob(currentIndex: number, jobs: number[][]) {
  const currentEndTime = jobs[currentIndex][1];

  let left = currentIndex + 1;
  let right = jobs.length - 1;
  let nextIndex = jobs.length;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (jobs[mid][0] >= currentEndTime) {
      nextIndex = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return nextIndex;
}
