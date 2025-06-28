const Solution = require('./network-delay-time');

const solution = new Solution();
solution.testCases = [
  {
    description: 'Basic test case - simple connected graph',
    input: [
      [
        [2, 1, 1],
        [2, 3, 1],
        [3, 4, 1]
      ],
      4,
      2
    ],
    expected: 2,
    category: 'basic'
  },
  {
    description: 'LeetCode example 1',
    input: [
      [
        [2, 1, 1],
        [2, 3, 1],
        [3, 4, 1]
      ],
      4,
      2
    ],
    expected: 2,
    category: 'basic'
  },
  {
    description: 'LeetCode example 2 - single node',
    input: [[], 1, 1],
    expected: 0,
    category: 'basic'
  },
  {
    description: 'Edge case - unreachable nodes',
    input: [[[1, 2, 1]], 2, 2],
    expected: -1,
    category: 'edge'
  },
  {
    description: 'Edge case - disconnected graph',
    input: [
      [
        [1, 2, 1],
        [3, 4, 1]
      ],
      4,
      1
    ],
    expected: -1,
    category: 'edge'
  },
  {
    description: 'Edge case - self loop',
    input: [[[1, 1, 1]], 1, 1],
    expected: 0,
    category: 'edge'
  },
  {
    description: 'Performance test case - larger graph',
    input: [
      [
        [1, 2, 1],
        [1, 3, 4],
        [2, 3, 2],
        [2, 4, 7],
        [3, 4, 1]
      ],
      4,
      1
    ],
    expected: 4,
    category: 'performance'
  },
  {
    description: 'Complex graph with multiple paths',
    input: [
      [
        [1, 2, 1],
        [1, 3, 2],
        [2, 4, 3],
        [3, 4, 1],
        [4, 5, 1]
      ],
      5,
      1
    ],
    expected: 4,
    category: 'performance'
  }
];

module.exports = solution;
