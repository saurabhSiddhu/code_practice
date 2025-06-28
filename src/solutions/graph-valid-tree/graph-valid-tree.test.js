const Solution = require('./graph-valid-tree');

const solution = new Solution();
solution.testCases = [
  {
    description: 'Valid tree with 5 nodes',
    input: {
      n: 5,
      edges: [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 4]
      ]
    },
    expected: true,
    category: 'basic'
  },
  {
    description: 'Graph with cycle - invalid tree',
    input: {
      n: 5,
      edges: [
        [0, 1],
        [1, 2],
        [2, 3],
        [1, 3],
        [1, 4]
      ]
    },
    expected: false,
    category: 'basic'
  },
  {
    description: 'Single node - valid tree',
    input: { n: 1, edges: [] },
    expected: true,
    category: 'edge'
  },
  {
    description: 'Two disconnected nodes - invalid tree',
    input: { n: 2, edges: [] },
    expected: false,
    category: 'edge'
  },
  {
    description: 'Empty graph - edge case',
    input: { n: 0, edges: [] },
    expected: true,
    category: 'edge'
  },
  {
    description: 'Linear tree - valid',
    input: {
      n: 4,
      edges: [
        [0, 1],
        [1, 2],
        [2, 3]
      ]
    },
    expected: true,
    category: 'basic'
  },
  {
    description: 'Too many edges - creates cycle',
    input: {
      n: 3,
      edges: [
        [0, 1],
        [1, 2],
        [2, 0]
      ]
    },
    expected: false,
    category: 'basic'
  },
  {
    description: 'Large valid tree - performance test',
    input: {
      n: 1000,
      edges: Array.from({ length: 999 }, (_, i) => [i, i + 1])
    },
    expected: true,
    category: 'performance'
  }
];

module.exports = solution;
