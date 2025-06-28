const Solution = require('./tree-diameter');

const solution = new Solution();
solution.testCases = [
  // Basic test cases
  {
    description: 'Simple linear tree (path)',
    input: {
      n: 4,
      edges: [
        [0, 1],
        [1, 2],
        [2, 3]
      ]
    },
    expected: 3,
    category: 'basic'
  },
  {
    description: 'Small balanced tree',
    input: {
      n: 5,
      edges: [
        [0, 1],
        [0, 2],
        [1, 3],
        [1, 4]
      ]
    },
    expected: 3,
    category: 'basic'
  },
  {
    description: 'Classic example tree',
    input: {
      n: 6,
      edges: [
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 4],
        [2, 5]
      ]
    },
    expected: 4,
    category: 'basic'
  },

  // Edge cases
  {
    description: 'Single node tree',
    input: {
      n: 1,
      edges: []
    },
    expected: 0,
    category: 'edge'
  },
  {
    description: 'Two node tree',
    input: {
      n: 2,
      edges: [[0, 1]]
    },
    expected: 1,
    category: 'edge'
  },
  {
    description: 'Star graph (all nodes connected to center)',
    input: {
      n: 5,
      edges: [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4]
      ]
    },
    expected: 2,
    category: 'edge'
  },

  // Complex cases
  {
    description: 'Deep unbalanced tree',
    input: {
      n: 7,
      edges: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6]
      ]
    },
    expected: 6,
    category: 'complex'
  },
  {
    description: 'Tree with multiple long paths',
    input: {
      n: 8,
      edges: [
        [0, 1],
        [1, 2],
        [1, 3],
        [3, 4],
        [4, 5],
        [3, 6],
        [6, 7]
      ]
    },
    expected: 5,
    category: 'complex'
  },
  {
    description: 'Larger balanced tree',
    input: {
      n: 7,
      edges: [
        [0, 1],
        [0, 2],
        [1, 3],
        [1, 4],
        [2, 5],
        [2, 6]
      ]
    },
    expected: 4,
    category: 'complex'
  },

  // Performance test cases
  {
    description: 'Medium-sized linear tree',
    input: {
      n: 100,
      edges: Array.from({ length: 99 }, (_, i) => [i, i + 1])
    },
    expected: 99,
    category: 'performance'
  },
  {
    description: 'Large complete binary tree height 4',
    input: {
      n: 15,
      edges: [
        [0, 1],
        [0, 2], // Level 1
        [1, 3],
        [1, 4],
        [2, 5],
        [2, 6], // Level 2
        [3, 7],
        [3, 8],
        [4, 9],
        [4, 10],
        [5, 11],
        [5, 12],
        [6, 13],
        [6, 14] // Level 3
      ]
    },
    expected: 6,
    category: 'performance'
  },

  // Special patterns
  {
    description: 'Diameter not through root',
    input: {
      n: 6,
      edges: [
        [0, 1],
        [1, 2],
        [2, 3],
        [2, 4],
        [4, 5]
      ]
    },
    expected: 4,
    category: 'special'
  },
  {
    description: 'Multiple diameter paths of same length',
    input: {
      n: 7,
      edges: [
        [3, 0],
        [3, 1],
        [3, 2],
        [0, 4],
        [1, 5],
        [2, 6]
      ]
    },
    expected: 4,
    category: 'special'
  }
];

module.exports = solution;
