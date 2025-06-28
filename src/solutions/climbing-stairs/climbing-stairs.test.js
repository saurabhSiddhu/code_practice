const Solution = require('./climbing-stairs');

const solution = new Solution();
solution.testCases = [
  // Basic test cases
  {
    description: 'Basic case - 1 step',
    input: 1,
    expected: 1,
    category: 'basic'
  },
  {
    description: 'Basic case - 2 steps',
    input: 2,
    expected: 2,
    category: 'basic'
  },
  {
    description: 'Basic case - 3 steps',
    input: 3,
    expected: 4,
    category: 'basic'
  },
  {
    description: 'Basic case - 4 steps',
    input: 4,
    expected: 7,
    category: 'basic'
  },
  {
    description: 'Basic case - 5 steps',
    input: 5,
    expected: 13,
    category: 'basic'
  },
  {
    description: 'Basic case - 6 steps',
    input: 6,
    expected: 24,
    category: 'basic'
  },
  {
    description: 'Basic case - 7 steps',
    input: 7,
    expected: 44,
    category: 'basic'
  },

  // Edge cases
  {
    description: 'Edge case - Minimum valid input',
    input: 1,
    expected: 1,
    category: 'edge'
  },
  {
    description: 'Edge case - Small staircase',
    input: 2,
    expected: 2,
    category: 'edge'
  },
  {
    description: 'Edge case - Tribonacci base case',
    input: 3,
    expected: 4,
    category: 'edge'
  },
  {
    description: 'Edge case - Medium staircase',
    input: 10,
    expected: 274,
    category: 'edge'
  },
  {
    description: 'Edge case - Larger staircase',
    input: 15,
    expected: 5768,
    category: 'edge'
  },

  // Performance test cases
  {
    description: 'Performance test - 20 steps',
    input: 20,
    expected: 121415,
    category: 'performance'
  },
  {
    description: 'Performance test - 25 steps',
    input: 25,
    expected: 2555757,
    category: 'performance'
  },
  {
    description: 'Performance test - 30 steps',
    input: 30,
    expected: 53798080,
    category: 'performance'
  },
  {
    description: 'Performance test - 35 steps (large input)',
    input: 35,
    expected: 1132436852,
    category: 'performance'
  }
];

module.exports = solution;
