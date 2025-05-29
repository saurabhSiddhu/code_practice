const Solution = require('./ribbon-cut');

const solution = new Solution();
solution.testCases = [
  {
    description: 'Basic test case - Standard ribbon cutting',
    input: { lengths: [2, 3, 5], ribbonLength: 5 },
    expected: 2,
    category: 'basic'
  },
  {
    description: 'Basic test case - Maximum pieces with small cuts',
    input: { lengths: [1, 3, 4], ribbonLength: 4 },
    expected: 4,
    category: 'basic'
  },
  {
    description: 'Basic test case - Exact single cut match',
    input: { lengths: [3, 5, 7], ribbonLength: 7 },
    expected: 1,
    category: 'basic'
  },
  {
    description: 'Basic test case - Multiple optimal combinations',
    input: { lengths: [2, 3], ribbonLength: 6 },
    expected: 3,
    category: 'basic'
  },
  {
    description: 'Edge case - Zero ribbon length',
    input: { lengths: [1, 2, 3], ribbonLength: 0 },
    expected: 0,
    category: 'edge'
  },
  {
    description: 'Edge case - Empty lengths array',
    input: { lengths: [], ribbonLength: 5 },
    expected: 0,
    category: 'edge'
  },
  {
    description: 'Edge case - All cuts larger than ribbon',
    input: { lengths: [5, 7, 9], ribbonLength: 4 },
    expected: 0,
    category: 'edge'
  },
  {
    description: 'Edge case - Single length available',
    input: { lengths: [3], ribbonLength: 9 },
    expected: 3,
    category: 'edge'
  },
  {
    description: 'Edge case - Impossible to cut ribbon completely',
    input: { lengths: [3, 5], ribbonLength: 7 },
    expected: 0,
    category: 'edge'
  },
  {
    description: 'Performance test case - Large ribbon with many cut options',
    input: { lengths: [1, 2, 3, 4, 5, 6, 7, 8], ribbonLength: 100 },
    expected: 100,
    category: 'performance'
  },
  {
    description: 'Performance test case - Large ribbon with limited cuts',
    input: { lengths: [3, 7, 11], ribbonLength: 50 },
    expected: 14,
    category: 'performance'
  }
];

module.exports = solution;
