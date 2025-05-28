const Solution = require('./coin-change-1');

const solution = new Solution();
solution.testCases = [
  {
    description: 'Basic test case - LeetCode Example 1',
    input: { coins: [1, 3, 4], amount: 6 },
    expected: 2,
    category: 'basic'
  },
  {
    description: 'Basic test case - LeetCode Example 2',
    input: { coins: [2], amount: 3 },
    expected: -1,
    category: 'basic'
  },
  {
    description: 'Basic test case - LeetCode Example 3',
    input: { coins: [1], amount: 0 },
    expected: 0,
    category: 'basic'
  },
  {
    description: 'Standard combination exploration case',
    input: { coins: [1, 2, 5], amount: 11 },
    expected: 3,
    category: 'basic'
  },
  {
    description: 'Edge case - zero amount',
    input: { coins: [1, 2, 5], amount: 0 },
    expected: 0,
    category: 'edge'
  },
  {
    description: 'Edge case - no coins available',
    input: { coins: [], amount: 5 },
    expected: -1,
    category: 'edge'
  },
  {
    description: 'Edge case - impossible to make amount',
    input: { coins: [3, 5], amount: 1 },
    expected: -1,
    category: 'edge'
  },
  {
    description: 'Edge case - single coin exact match',
    input: { coins: [5], amount: 5 },
    expected: 1,
    category: 'edge'
  },
  {
    description: 'Edge case - all coins larger than amount',
    input: { coins: [10, 15, 20], amount: 5 },
    expected: -1,
    category: 'edge'
  },
  {
    description: 'Performance test case - large amount with many coins',
    input: { coins: [1, 2, 5, 10, 20, 50, 100], amount: 500 },
    expected: 5,
    category: 'performance'
  },
  {
    description: 'Performance test case - large amount with few coins',
    input: { coins: [1, 7, 10], amount: 100 },
    expected: 10,
    category: 'performance'
  }
];

module.exports = solution;
