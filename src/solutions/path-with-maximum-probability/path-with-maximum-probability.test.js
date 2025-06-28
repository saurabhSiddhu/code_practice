const Solution = require('./path-with-maximum-probability');

const solution = new Solution();
solution.testCases = [
  {
    description: 'Example 1: Simple 3-node path',
    input: {
      n: 3,
      edges: [
        [0, 1],
        [1, 2],
        [0, 2]
      ],
      succProb: [0.5, 0.5, 0.2],
      start: 0,
      end: 2
    },
    expected: 0.25,
    category: 'basic'
  },
  {
    description: 'Example 2: Direct connection vs indirect path',
    input: {
      n: 3,
      edges: [
        [0, 1],
        [1, 2],
        [0, 2]
      ],
      succProb: [0.5, 0.5, 0.3],
      start: 0,
      end: 2
    },
    expected: 0.3,
    category: 'basic'
  },
  {
    description: 'Example 3: No path exists',
    input: {
      n: 3,
      edges: [[0, 1]],
      succProb: [0.5],
      start: 0,
      end: 2
    },
    expected: 0.0,
    category: 'basic'
  },
  {
    description: 'Edge case: Start equals end',
    input: {
      n: 2,
      edges: [[0, 1]],
      succProb: [0.5],
      start: 0,
      end: 0
    },
    expected: 1.0,
    category: 'edge'
  },
  {
    description: 'Edge case: Single node graph',
    input: {
      n: 1,
      edges: [],
      succProb: [],
      start: 0,
      end: 0
    },
    expected: 1.0,
    category: 'edge'
  },
  {
    description: 'Edge case: Two nodes with no connection',
    input: {
      n: 2,
      edges: [],
      succProb: [],
      start: 0,
      end: 1
    },
    expected: 0.0,
    category: 'edge'
  },
  {
    description: 'Complex case: Multiple possible paths',
    input: {
      n: 4,
      edges: [
        [0, 1],
        [1, 2],
        [2, 3],
        [0, 3],
        [1, 3]
      ],
      succProb: [0.4, 0.7, 0.8, 0.2, 0.5],
      start: 0,
      end: 3
    },
    expected: 0.28, // 0->1->2->3: 0.4*0.7*0.8 = 0.224, 0->3: 0.2, 0->1->3: 0.4*0.5 = 0.2, max = 0.224
    category: 'basic'
  },
  {
    description: 'High probability edges',
    input: {
      n: 3,
      edges: [
        [0, 1],
        [1, 2]
      ],
      succProb: [0.9, 0.9],
      start: 0,
      end: 2
    },
    expected: 0.81,
    category: 'basic'
  },
  {
    description: 'Very low probability edges',
    input: {
      n: 3,
      edges: [
        [0, 1],
        [1, 2]
      ],
      succProb: [0.1, 0.1],
      start: 0,
      end: 2
    },
    expected: 0.01,
    category: 'basic'
  },
  {
    description: 'Performance test: Larger graph',
    input: {
      n: 10,
      edges: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 8],
        [8, 9],
        [0, 9],
        [2, 7],
        [1, 8]
      ],
      succProb: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.1, 0.7, 0.6],
      start: 0,
      end: 9
    },
    expected: 0.262144, // 0->1->2->3->4->5->6->7->8->9: 0.8^8 = 0.16777216, vs 0->9: 0.1, vs other paths
    category: 'performance'
  }
];

module.exports = solution;
