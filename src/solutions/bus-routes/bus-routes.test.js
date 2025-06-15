const Solution = require('./bus-routes');

const solution = new Solution();
solution.testCases = [
  {
    description: 'Basic test case - Simple path with 2 buses',
    input: [
      [
        [1, 2, 7],
        [3, 6, 7]
      ],
      1,
      3
    ],
    expected: 2,
    category: 'basic'
  },
  {
    description: 'Basic test case - Multi-hop path',
    input: [
      [
        [1, 2],
        [2, 3],
        [3, 4]
      ],
      1,
      4
    ],
    expected: 3,
    category: 'basic'
  },
  {
    description: 'Basic test case - LeetCode example',
    input: [
      [
        [1, 2, 7],
        [3, 6, 7]
      ],
      1,
      3
    ],
    expected: 2,
    category: 'basic'
  },
  {
    description: 'Edge case - Source equals target',
    input: [
      [
        [1, 2, 3],
        [4, 5, 6]
      ],
      2,
      2
    ],
    expected: 0,
    category: 'edge'
  },
  {
    description: 'Edge case - No routes available',
    input: [[], 1, 2],
    expected: -1,
    category: 'edge'
  },
  {
    description: 'Edge case - Source not in any route',
    input: [
      [
        [1, 2, 3],
        [4, 5, 6]
      ],
      7,
      3
    ],
    expected: -1,
    category: 'edge'
  },
  {
    description: 'Edge case - Target not in any route',
    input: [
      [
        [1, 2, 3],
        [4, 5, 6]
      ],
      2,
      7
    ],
    expected: -1,
    category: 'edge'
  },
  {
    description: 'Edge case - Same route contains both source and target',
    input: [
      [
        [1, 2, 3, 4, 5],
        [6, 7, 8]
      ],
      2,
      4
    ],
    expected: 1,
    category: 'edge'
  },
  {
    description: 'Edge case - No path exists between source and target',
    input: [
      [
        [1, 2, 3],
        [4, 5, 6]
      ],
      1,
      5
    ],
    expected: -1,
    category: 'edge'
  },
  {
    description: 'Complex case - Multiple transfers needed',
    input: [
      [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4]
      ],
      0,
      4
    ],
    expected: 4,
    category: 'basic'
  },
  {
    description: 'Performance test case - Large network with optimal path',
    input: [
      // Create a connected chain of routes for testing
      [
        [0, 100],
        [100, 200],
        [200, 299]
      ],
      0,
      299
    ],
    expected: 3,
    category: 'performance'
  }
];

module.exports = solution;
