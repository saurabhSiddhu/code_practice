/**
 * Five Sum Problem
 * Find all unique quintuples in the array which gives the sum of target.
 *
 * Difficulty: 🔴 HARD
 * Pattern: Multiple Pointers / Nested Loops
 */
class FiveSum {
  constructor() {
    this.testCases = [
      {
        description: 'Basic test case',
        input: { nums: [1, 0, -1, 0, -2, 2], target: 0 },
        expected: [[-2, -1, 1, 2, 0]],
        category: 'basic'
      },
      {
        description: 'Empty array',
        input: { nums: [], target: 0 },
        expected: [],
        category: 'edge'
      },
      {
        description: 'No valid quintuples',
        input: { nums: [1, 2, 3, 4], target: 100 },
        expected: [],
        category: 'edge'
      }
    ];
  }

  solve(input) {
    const { nums, target } = input;

    // TODO: Implement five sum solution
    // Hint: Sort array first, then use nested loops with two pointers

    return [];
  }
}

module.exports = FiveSum;
