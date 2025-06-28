const Solution = require('./minimum-cost-to-make-at-least-one-valid-path-in-a-grid');

const solution = new Solution();
solution.testCases = [
  {
    description: 'Basic case - small grid with some direction changes needed',
    input: [
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [1, 1, 1, 1],
      [2, 2, 2, 2]
    ],
    expected: 3,
    category: 'basic'
  },
  {
    description: 'No changes needed - path already valid',
    input: [
      [1, 1, 3],
      [3, 2, 2],
      [1, 1, 1]
    ],
    expected: 0,
    category: 'basic'
  },
  {
    description: 'Maximum changes needed - opposite directions',
    input: [
      [2, 2, 2],
      [2, 2, 2],
      [2, 2, 2]
    ],
    expected: 4,
    category: 'basic'
  },
  {
    description: 'Single cell - edge case',
    input: [[1]],
    expected: 0,
    category: 'edge'
  },
  {
    description: 'Single row - horizontal path',
    input: [[1, 1, 2, 1]],
    expected: 1,
    category: 'edge'
  },
  {
    description: 'Single column - vertical path',
    input: [[3], [3], [3], [2]],
    expected: 1,
    category: 'edge'
  },
  {
    description: 'Zigzag pattern - requires strategic changes',
    input: [
      [1, 2],
      [4, 3]
    ],
    expected: 1,
    category: 'edge'
  },
  {
    description: 'Large grid - performance test',
    input: [
      [1, 1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2, 2],
      [1, 1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2, 2],
      [1, 1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2, 2]
    ],
    expected: 5,
    category: 'performance'
  }
];

module.exports = solution;
