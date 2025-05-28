const Solution = require('./rod-cutting');

const solution = new Solution();
solution.testCases = [
  {
    description: 'Basic test case',
    input: [[1, 2, 3, 4, 5], [2, 6, 7, 10, 13], 5],
    expected: 14,
    category: 'basic'
  },
  {
    description: 'Edge case',
    input: [[1], [1], 4],
    expected: 4,
    category: 'edge'
  },
  {
    description: 'Performance test case (very large input)',
    input: [
      Array.from({ length: 200 }, (_, i) => i + 1),
      Array.from({ length: 200 }, (_, i) => (i + 1) * 3),
      200
    ],
    expected: 600,
    category: 'performance'
  }
];

module.exports = solution;
